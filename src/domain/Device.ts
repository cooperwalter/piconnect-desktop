/**
 * Domain model for a Raspberry Pi device connected to Pi Connect
 */
export interface Device {
  id: string;
  name: string;
  hostname: string;
  online: boolean;
  lastSeen?: Date;
  capabilities: DeviceCapabilities;
}

export interface DeviceCapabilities {
  ssh: boolean;
  vnc: boolean;
  sftp: boolean;
}

export type DeviceStatus = 'online' | 'offline' | 'unknown';
