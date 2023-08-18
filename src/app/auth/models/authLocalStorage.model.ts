import { Customer } from './customer.model';

export interface LocalStorageAuthData {
  customer: Customer;
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}
