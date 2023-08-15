export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
  customerId: string | null;
}

export const authStateName = 'authState';

export interface AppState {
  authState: AuthState;
}
