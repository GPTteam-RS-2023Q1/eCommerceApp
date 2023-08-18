import { Customer } from '@app/auth/models/customer.model';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
  customer: Customer | null;
}

export const authStateName = 'authState';

export interface AppState {
  authState: AuthState;
}
