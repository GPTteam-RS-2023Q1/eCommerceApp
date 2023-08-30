import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map } from 'rxjs';

import { ProductService } from '@app/core/services/product.service';

import { catalogActions } from '../actions/catalog.actions';

@Injectable()
export class CatalogEffects {
  public getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(catalogActions.getProducts),
      exhaustMap(() => {
        return this.productService
          .getProducts()
          .pipe(
            map((response) =>
              catalogActions.getProductsSuccess({ products: response.results })
            )
          );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService
  ) {}
}
