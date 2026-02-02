/**
 * Tests for App controller
 */
import { describe, test, expect } from 'vitest';
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

  async getUser(_token: AuthToken): Promise<User> {
    return {
      email: 'test@example.com',
      name: 'Test User',
    };
  }

  async listDevices(_token: AuthToken): Promise<Device[]> {
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

  async getDevice(_token: AuthToken, deviceId: string): Promise<Device> {
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

  async startSSHSession(_token: AuthToken, _deviceId: string) {
    return {
      host: 'localhost',
      port: 22,
      username: 'pi',
      credential: 'mock-key',
    };
  }

  async startVNCSession(_token: AuthToken, _deviceId: string) {
    return {
      host: 'localhost',
      port: 5900,
      password: 'mock-pass',
    };
  }

  async startSFTPSession(_token: AuthToken, _deviceId: string) {
    return {
      host: 'localhost',
      port: 22,
      username: 'pi',
      credential: 'mock-key',
    };
  }
}

describe('App', () => {
  test('initial state is not authenticated', () => {
    const app = new App(new MockPiConnectAdapter());
    expect(app.isAuthenticated()).toBe(false);
    expect(app.getDevices()).toHaveLength(0);
  });

  test('login authenticates and loads devices', async () => {
    const app = new App(new MockPiConnectAdapter());
    await app.login();
    
    expect(app.isAuthenticated()).toBe(true);
    expect(app.getDevices()).toHaveLength(1);
    expect(app.getDevices()[0].name).toBe('Test Pi');
  });

  test('throws error when opening SSH without auth', async () => {
    const app = new App(new MockPiConnectAdapter());
    await expect(app.openSSH('device-1')).rejects.toThrow('Not authenticated');
  });

  test('can open SSH after login', async () => {
    const app = new App(new MockPiConnectAdapter());
    await app.login();
    // Should not throw (Tauri commands will fail but that's expected in test env)
    await expect(app.openSSH('device-1')).resolves.toBeUndefined();
  });
});
