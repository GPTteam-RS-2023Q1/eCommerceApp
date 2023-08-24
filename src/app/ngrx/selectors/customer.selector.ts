import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState, customerStateName } from '../state.model';

export const selectCustomerState =
  createFeatureSelector<CustomerState>(customerStateName);

export const selectCustomer = createSelector(
  selectCustomerState,
  (customerState) => customerState.customer
);

export const selectUserName = createSelector(
  selectCustomerState,
  (customerState) => customerState.customer?.firstName ?? 'user'
);
