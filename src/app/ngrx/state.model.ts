import { Customer } from '@app/auth/models/customer.model';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
}

export interface CustomerState {
  customer: Customer | null;
}

export const authStateName = 'authState';
export const customerStateName = 'customerState';

export interface AppState {
  authState: AuthState;
  customerState: CustomerState;
}
