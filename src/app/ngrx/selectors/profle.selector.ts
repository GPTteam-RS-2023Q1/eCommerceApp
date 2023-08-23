import { createSelector } from '@ngrx/store';
import { selectAuthState } from './auth.selector';

export const selectCustomer = createSelector(
  selectAuthState,
  (authState) => authState.customer
);
