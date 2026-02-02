/**
 * Domain model for Pi Connect authentication
 */
export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: Date;
}

export interface User {
  email: string;
  name?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: User;
  token?: AuthToken;
}
