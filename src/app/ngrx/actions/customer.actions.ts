import { createActionGroup, props } from '@ngrx/store';

import { Customer } from '@app/auth/models/customer.model';

export const customerAction = createActionGroup({
  source: 'Customer',
  events: {
    'Save Customer': props<{ customer: Customer }>(),
  },
});
