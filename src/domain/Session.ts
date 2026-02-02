/**
 * Domain model for device sessions (SSH, VNC, SFTP)
 */
export type SessionType = 'ssh' | 'vnc' | 'sftp';

export interface Session {
  id: string;
  deviceId: string;
  type: SessionType;
  status: SessionStatus;
  startedAt: Date;
  endedAt?: Date;
}

export type SessionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface SessionError {
  code: string;
  message: string;
}
