import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authAction = createActionGroup({
  source: 'Auth',
  events: {
    'Get Customer Id': props<{ customerId: string }>(),
    'Login Start': props<{ email: string; password: string }>(),
    'Login Success': props<{
      accessToken: string;
      refreshToken: string;
    }>(),
    'Auth Fail': props<{ errorMessage: string }>(),
    'Get Token': emptyProps(),
    'Token Success': props<{ accessToken: string }>(),
    'Auto Login Success': props<{
      customerId: string;
      accessToken: string;
      refreshToken: string;
    }>(),
  },
});
