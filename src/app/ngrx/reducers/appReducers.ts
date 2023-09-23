import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state.model';
import { authReducer } from './auth.reducer';
import { catalogReducer } from './catalog.reducer';
import { customerReducer } from './customer.reducer';
import { cartReducer } from './cart.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  customerState: customerReducer,
  catalog: catalogReducer,
  cartState: cartReducer,
};
