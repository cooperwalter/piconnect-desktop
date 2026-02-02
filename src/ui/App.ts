/**
 * Main application controller
 */
import type { Device } from '../domain/Device.js';
import type { AuthState } from '../domain/Auth.js';
import type { PiConnectAdapter } from '../adapters/PiConnectAdapter.js';
import { WebviewPiConnectAdapter } from '../adapters/piconnect/WebviewPiConnectAdapter.js';

export class App {
  private adapter: PiConnectAdapter;
  private authState: AuthState = { isAuthenticated: false };
  private devices: Device[] = [];

  constructor(adapter?: PiConnectAdapter) {
    this.adapter = adapter || new WebviewPiConnectAdapter();
  }

  async login(): Promise<void> {
    const token = await this.adapter.authenticate();
    const user = await this.adapter.getUser(token);
    this.authState = {
      isAuthenticated: true,
      user,
      token,
    };
    await this.refreshDevices();
  }

  async refreshDevices(): Promise<void> {
    if (!this.authState.token) {
      throw new Error('Not authenticated');
    }
    this.devices = await this.adapter.listDevices(this.authState.token);
  }

  getDevices(): Device[] {
    return this.devices;
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  async openSSH(deviceId: string): Promise<void> {
    if (!this.authState.token) {
      throw new Error('Not authenticated');
    }
    const info = await this.adapter.startSSHSession(this.authState.token, deviceId);
    // TODO: Launch system terminal with SSH connection
    console.log('SSH connection info:', info);
  }

  async openVNC(deviceId: string): Promise<void> {
    if (!this.authState.token) {
      throw new Error('Not authenticated');
    }
    const info = await this.adapter.startVNCSession(this.authState.token, deviceId);
    // TODO: Launch VNC client
    console.log('VNC connection info:', info);
  }

  async openSFTP(deviceId: string): Promise<void> {
    if (!this.authState.token) {
      throw new Error('Not authenticated');
    }
    const info = await this.adapter.startSFTPSession(this.authState.token, deviceId);
    // TODO: Launch SFTP client / file browser
    console.log('SFTP connection info:', info);
  }
}
