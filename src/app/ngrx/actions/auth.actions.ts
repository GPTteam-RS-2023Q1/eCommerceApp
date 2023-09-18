import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Customer } from '@app/auth/models/customer.model';
import { CustomerDraft } from '@app/auth/models/customer-draft.model';

export const authAction = createActionGroup({
  source: 'Auth',
  events: {
    'Sign Up Start': props<{ body: CustomerDraft }>(),
    'Login Customer': props<{ customer: Customer; email: string; password: string }>(),
    'Anonymous Session Start': emptyProps(),
    'Login Start': props<{ email: string; password: string }>(),
    'Login Success': props<{
      accessToken: string;
      refreshToken: string;
    }>(),
    'Auth Fail': props<{ errorMessage: string | null }>(),
    'Get Token': emptyProps(),
    'Get Customer': props<{ customer: Customer }>(),
    'Token Success': props<{ accessToken: string }>(),
    'Auto Login Start': props<{ refreshToken: string }>(),
    'Auto Login Success': props<{
      customerId: string;
      accessToken: string;
      refreshToken: string;
    }>(),
    'Log out': emptyProps(),
  },
});
