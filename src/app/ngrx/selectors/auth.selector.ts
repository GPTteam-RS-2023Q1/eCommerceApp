import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authStateName } from '../state.model';

export const selectAuthState = createFeatureSelector<AuthState>(authStateName);
export const selectAccessToken = createSelector(
  selectAuthState,
  (authState) => authState.accessToken
);
