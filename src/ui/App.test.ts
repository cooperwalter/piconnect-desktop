/**
 * Tests for App controller
 */
import { test } from 'node:test';
import assert from 'node:assert';
import { App } from './App.js';
import type { PiConnectAdapter } from '../adapters/PiConnectAdapter.js';
import type { Device } from '../domain/Device.js';
import type { AuthToken, User } from '../domain/Auth.js';

// Mock adapter for testing
class MockPiConnectAdapter implements PiConnectAdapter {
  async authenticate(): Promise<AuthToken> {
    return {
      accessToken: 'mock-token',
      expiresAt: new Date(Date.now() + 3600000),
    };
  }

  async getUser(token: AuthToken): Promise<User> {
    return {
      email: 'test@example.com',
      name: 'Test User',
    };
  }

  async listDevices(token: AuthToken): Promise<Device[]> {
    return [
      {
        id: 'device-1',
        name: 'Test Pi',
        hostname: 'test-pi.local',
        online: true,
        capabilities: {
          ssh: true,
          vnc: true,
          sftp: true,
        },
      },
    ];
  }

  async getDevice(token: AuthToken, deviceId: string): Promise<Device> {
    return {
      id: deviceId,
      name: 'Test Pi',
      hostname: 'test-pi.local',
      online: true,
      capabilities: {
        ssh: true,
        vnc: true,
        sftp: true,
      },
    };
  }

  async startSSHSession(token: AuthToken, deviceId: string) {
    return {
      host: 'localhost',
      port: 22,
      username: 'pi',
      credential: 'mock-key',
    };
  }

  async startVNCSession(token: AuthToken, deviceId: string) {
    return {
      host: 'localhost',
      port: 5900,
      password: 'mock-pass',
    };
  }

  async startSFTPSession(token: AuthToken, deviceId: string) {
    return {
      host: 'localhost',
      port: 22,
      username: 'pi',
      credential: 'mock-key',
    };
  }
}

test('App - initial state is not authenticated', () => {
  const app = new App(new MockPiConnectAdapter());
  assert.strictEqual(app.isAuthenticated(), false);
  assert.strictEqual(app.getDevices().length, 0);
});

test('App - login authenticates and loads devices', async () => {
  const app = new App(new MockPiConnectAdapter());
  await app.login();
  
  assert.strictEqual(app.isAuthenticated(), true);
  assert.strictEqual(app.getDevices().length, 1);
  assert.strictEqual(app.getDevices()[0].name, 'Test Pi');
});

test('App - throws error when opening SSH without auth', async () => {
  const app = new App(new MockPiConnectAdapter());
  await assert.rejects(
    async () => await app.openSSH('device-1'),
    { message: 'Not authenticated' }
  );
});

test('App - can open SSH after login', async () => {
  const app = new App(new MockPiConnectAdapter());
  await app.login();
  // Should not throw
  await app.openSSH('device-1');
});
