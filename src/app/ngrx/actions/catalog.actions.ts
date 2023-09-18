import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { BuildedParams } from '@app/catalog/services/query-builder.service';
import { Category } from '@app/shared/models/interfaces/category';
import { ProductProjectionPageQueryResponse } from '@app/shared/models/interfaces/page-query-results';

export const catalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    'Get Products': props<{ params: BuildedParams }>(),
    'Get Products Success': props<{ products: ProductProjectionPageQueryResponse }>(),

    'Get Categories': emptyProps(),
    'Get Categories Success': props<{ categories: Category[] }>(),
  },
});
