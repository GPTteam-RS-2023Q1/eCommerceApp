import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from '@app/core/models/product';

export const catalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    'Get Products': emptyProps(),
    'Get Products Success': props<{ products: Product[] }>(),
  },
});
