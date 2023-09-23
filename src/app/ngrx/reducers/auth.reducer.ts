import { createReducer, on } from '@ngrx/store';

import { authAction } from '../actions/auth.actions';
import { AuthState } from '../state.model';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    authAction.autoLoginSuccess,
    (state, { accessToken, refreshToken }): AuthState => ({
      ...state,
      accessToken,
      refreshToken,
    })
  ),
  on(
    authAction.loginSuccess,
    (state, { accessToken, refreshToken }): AuthState => ({
      ...state,
      errorMessage: null,
      accessToken,
      refreshToken,
    })
  ),
  on(
    authAction.tokenSuccess,
    (state, { accessToken }): AuthState => ({
      ...state,
      errorMessage: null,
      accessToken,
    })
  ),
  on(authAction.authFail, (state, { errorMessage }): AuthState => {
    if (!errorMessage) {
      return {
        ...state,
        errorMessage,
      };
    }

    let message: string;
    switch (errorMessage) {
      case 'Account with the given credentials not found.':
        message = `${errorMessage} Please check your credentials and try again`;
        break;
      case 'There is already an existing customer with the provided email.':
        message = `${errorMessage} Please try different email.`;
        break;
      default:
        message = 'Something went wrong. Please reload the page and try again.';
    }
    return {
      ...state,
      errorMessage: message,
    };
  }),
  on(
    authAction.logOut,
    (state): AuthState => ({
      ...state,
      accessToken: null,
      refreshToken: null,
      errorMessage: null,
    })
  )
);
