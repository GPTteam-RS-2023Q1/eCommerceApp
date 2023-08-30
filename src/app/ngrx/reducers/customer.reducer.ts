import { createReducer, on } from '@ngrx/store';
import { customerAction } from '../actions/customer.actions';
import { CustomerState } from '../state.model';
import { authAction } from '../actions/auth.actions';

const initialState: CustomerState = {
  customer: null,
};

export const customerReducer = createReducer(
  initialState,
  on(
    customerAction.saveCustomer,
    (state, { customer }): CustomerState => ({
      ...state,
      customer,
    })
  ),
  on(
    authAction.logOut,
    (state): CustomerState => ({
      ...state,
      customer: null,
    })
  )
);
