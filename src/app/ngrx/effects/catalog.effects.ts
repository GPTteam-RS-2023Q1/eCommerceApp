import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map } from 'rxjs';

import { ProductService } from '@app/catalog/services/product.service';
import { BuildedParams } from '@app/catalog/services/query-builder.service';

import { catalogActions } from '../actions/catalog.actions';

@Injectable()
export class CatalogEffects {
  public getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(catalogActions.getProducts),
      exhaustMap(({ params }: { params: BuildedParams }) => {
        return this.productService
          .getProducts({ parameters: params })
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
