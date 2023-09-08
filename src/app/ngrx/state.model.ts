import { Customer } from '@app/auth/models/customer.model';
import { ProductProjection } from '@app/catalog/models/product-projection';
import { Category } from '@app/shared/models/interfaces/category';

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
  catalog: CatalogState;
}

export const catalogStateName = 'catalog';

export interface CatalogState {
  products: ProductProjection[] | null;
  categories: Category[] | null;
}
