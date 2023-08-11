import { createReducer, on } from '@ngrx/store';
import { authAction } from '../actions/auth.actions';
import { AuthState } from '../state.model';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  errorMessage: null,
  customerId: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    authAction.autoLoginSuccess,
    (state, { customerId, accessToken, refreshToken }): AuthState => ({
      ...state,
      customerId,
      accessToken,
      refreshToken,
    })
  ),
  on(
    authAction.loginSuccess,
    (state, { accessToken, refreshToken }): AuthState => ({
      ...state,
      accessToken,
      refreshToken,
    })
  ),
  on(
    authAction.tokenSuccess,
    (state, { accessToken }): AuthState => ({
      ...state,
      accessToken,
    })
  ),
  on(
    authAction.getCustomerId,
    (state, { customerId }): AuthState => ({
      ...state,
      customerId,
    })
  ),
  on(
    authAction.authFail,
    (state, { errorMessage }): AuthState => ({
      ...state,
      errorMessage,
    })
  )
);
