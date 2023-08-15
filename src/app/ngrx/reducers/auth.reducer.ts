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
  on(
    authAction.getCustomerId,
    (state, { customerId }): AuthState => ({
      ...state,
      errorMessage: null,
      customerId,
    })
  ),
  on(authAction.authFail, (state, { errorMessage }): AuthState => {
    let message: string | null;
    switch (errorMessage) {
      case 'Account with the given credentials not found.':
        message = `${errorMessage} Please check your credentials and try again`;
        break;
      default:
        message = errorMessage;
    }
    return {
      ...state,
      errorMessage: message,
    };
  })
);
