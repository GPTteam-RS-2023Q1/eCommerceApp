import { createReducer, on } from '@ngrx/store';
import { CartState } from '../state.model';
import { authAction } from '../actions/auth.actions';
import { cartActions } from '../actions/cart.actions';

const initialState: CartState = {
  cart: null,
};

export const cartReducer = createReducer(
  initialState,
  on(
    cartActions.saveCart,
    (state, { cart }): CartState => ({
      ...state,
      cart,
    })
  ),
  on(
    authAction.logOut,
    (state): CartState => ({
      ...state,
      cart: null,
    })
  )
);
