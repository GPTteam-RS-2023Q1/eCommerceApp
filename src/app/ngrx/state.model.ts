import { Customer } from '@app/auth/models/customer.model';
import { Category } from '@app/shared/models/interfaces/category';
import { ProductProjectionPageQueryResponse } from '@app/shared/models/interfaces/page-query-results';
import { Cart } from '@app/user/models/cart.model';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  errorMessage: string | null;
}

export interface CustomerState {
  customer: Customer | null;
}

export interface CartState {
  cart: Cart | null;
}

export const authStateName = 'authState';
export const customerStateName = 'customerState';
export const catalogStateName = 'catalog';
export const cartStateName = 'cartState';

export interface AppState {
  authState: AuthState;
  customerState: CustomerState;
  catalog: CatalogState;
  cartState: CartState;
}

export interface CatalogState {
  products: ProductProjectionPageQueryResponse | null;
  categories: Category[] | null;
}
