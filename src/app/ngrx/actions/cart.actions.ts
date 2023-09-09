import { Cart } from '@app/user/models/cart.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Get Cart': emptyProps(),
    'Save Cart': props<{ cart: Cart }>(),
  },
});
