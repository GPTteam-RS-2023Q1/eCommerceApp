import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { BuildedParams } from '@app/catalog/services/query-builder.service';
import { Category } from '@app/shared/models/interfaces/category';

export const catalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    'Get Products': props<{ params: BuildedParams }>(),
    'Get Products Success': props<{ products: ProductProjection[] }>(),

    'Get Categories': emptyProps(),
    'Get Categories Success': props<{ categories: Category[] }>(),
  },
});
