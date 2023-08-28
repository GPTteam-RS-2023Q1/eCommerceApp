import { Customer } from '@app/auth/models/customer.model';
import { Product } from '@app/core/models/product';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
  customer: Customer | null;
}

export const authStateName = 'authState';

export interface AppState {
  authState: AuthState;
  catalog: CatalogState;
}

export const catalogStateName = 'catalog';

export interface CatalogState {
  products: Product[] | null;
}
