import { HttpParams } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Category } from '@app/core/models/category';
import { Product } from '@app/core/models/product';

export const catalogActions = createActionGroup({
  source: 'Catalog',
  events: {
    'Get Products': props<{ params: HttpParams }>(),
    'Get Products Success': props<{ products: Product[] }>(),

    'Get Categories': emptyProps(),
    'Get Categories Success': props<{ categories: Category[] }>(),
  },
});
