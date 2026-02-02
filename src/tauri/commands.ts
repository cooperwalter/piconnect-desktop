/**
 * TypeScript bindings for Tauri backend commands
 */
import { invoke } from '@tauri-apps/api/core';

export interface SSHConnectionInfo {
  host: string;
  port: number;
  username: string;
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

/**
 * Open Pi Connect auth webview and capture credentials
 * @returns Auth token/session cookie
 */
export async function openAuthWebview(): Promise<string> {
  return await invoke<string>('open_auth_webview');
}

/**
 * Open system SSH terminal with connection info
 */
export async function openSSHTerminal(info: SSHConnectionInfo): Promise<void> {
  await invoke('open_ssh_terminal', {
    host: info.host,
    port: info.port,
    username: info.username,
    credential: info.credential,
  });
}

/**
 * Open VNC client with connection info
 */
export async function openVNCClient(info: VNCConnectionInfo): Promise<void> {
  await invoke('open_vnc_client', {
    host: info.host,
    port: info.port,
    password: info.password,
  });
}

/**
 * Open SFTP client with connection info
 */
export async function openSFTPClient(info: SFTPConnectionInfo): Promise<void> {
  await invoke('open_sftp_client', {
    host: info.host,
    port: info.port,
    username: info.username,
    credential: info.credential,
  });
}
