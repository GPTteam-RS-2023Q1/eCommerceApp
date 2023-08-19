import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Customer } from '@app/auth/models/customer.model';

export const authAction = createActionGroup({
  source: 'Auth',
  events: {
    'Get Customer': props<{ customer: Customer; email: string; password: string }>(),
    'Login Start': props<{ email: string; password: string }>(),
    'Login Success': props<{
      accessToken: string;
      refreshToken: string;
    }>(),
    'Auth Fail': props<{ errorMessage: string | null }>(),
    'Get Token': emptyProps(),
    'Token Success': props<{ accessToken: string }>(),
    'Auto Login Success': props<{
      customer: Customer;
      accessToken: string;
      refreshToken: string;
    }>(),
    'Log out': emptyProps(),
  },
});
