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

export const selectCustomerId = createSelector(
  selectCustomerState,
  (customerState) => customerState.customer?.id
);

export const selectCustomerVersion = createSelector(
  selectCustomerState,
  (customerState) => customerState.customer?.version
);

export const selectCustomerVersionAndId = createSelector(
  selectCustomerId,
  selectCustomerVersion,
  (id, version) => {
    if (id && version) {
      return { id, version };
    }

    return undefined;
  }
);
