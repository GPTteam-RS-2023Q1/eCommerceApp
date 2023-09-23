import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState, authStateName } from '../state.model';
import { selectCustomerState } from './customer.selector';

export const selectAuthState = createFeatureSelector<AuthState>(authStateName);

export const selectAccessToken = createSelector(
  selectAuthState,
  (authState) => authState.accessToken
);
export const selectAuthError = createSelector(
  selectAuthState,
  (authState) => authState.errorMessage
);

export const selectIsAuth = createSelector(
  selectCustomerState,
  (customerState) => !!customerState.customer?.id
);

export const selectIsUserAuthorizated = createSelector(
  selectAuthState,
  (authState) => !!authState.refreshToken
);
