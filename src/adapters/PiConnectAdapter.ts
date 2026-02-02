/**
 * Adapter interface for Pi Connect API
 * Implementation will use webview for auth + discovered endpoints
 */
import type { Device } from '../domain/Device.js';
import type { AuthToken, User } from '../domain/Auth.js';

export interface PiConnectAdapter {
  /**
   * Authenticate user and return token
   * This will launch webview to https://connect.raspberrypi.com
   * and capture session cookies/token
   */
  authenticate(): Promise<AuthToken>;

  /**
   * Get current user info
   */
  getUser(token: AuthToken): Promise<User>;

  /**
   * List devices for authenticated user
   */
  listDevices(token: AuthToken): Promise<Device[]>;

  /**
   * Get single device by ID
   */
  getDevice(token: AuthToken, deviceId: string): Promise<Device>;

  /**
   * Initiate SSH session
   * Returns connection details (host, port, credentials)
   */
  startSSHSession(token: AuthToken, deviceId: string): Promise<SSHConnectionInfo>;

  /**
   * Initiate VNC session
   * Returns connection details (host, port, credentials)
   */
  startVNCSession(token: AuthToken, deviceId: string): Promise<VNCConnectionInfo>;

  /**
   * Initiate SFTP session
   * Returns connection details (host, port, credentials)
   */
  startSFTPSession(token: AuthToken, deviceId: string): Promise<SFTPConnectionInfo>;
}

export interface SSHConnectionInfo {
  host: string;
  port: number;
  username: string;
  // Password or key-based auth TBD based on Pi Connect implementation
  credential: string;
}

export interface VNCConnectionInfo {
  host: string;
  port: number;
  password?: string;
}

export interface SFTPConnectionInfo {
  host: string;
  port: number;
  username: string;
  credential: string;
}
