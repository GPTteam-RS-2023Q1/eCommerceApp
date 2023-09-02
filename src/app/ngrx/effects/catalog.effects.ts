import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map } from 'rxjs';

import { CategoryService } from '@app/core/services/category.service';
import { ProductService } from '@app/core/services/product.service';

import { catalogActions } from '../actions/catalog.actions';

@Injectable()
export class CatalogEffects {
  public getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(catalogActions.getProducts),
      exhaustMap(({ params }: { params: HttpParams }) => {
        console.log(params);
        return this.productService
          .getProducts(params)
          .pipe(
            map((response) =>
              catalogActions.getProductsSuccess({ products: response.results })
            )
          );
      })
    );
  });

  /* public getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(catalogActions.getCategories),
      exhaustMap(() => {
        return this.categoryService
          .getCategories()
          .pipe(
            map((response) =>
              catalogActions.getCategoriesSuccess({ categories: response.results })
            )
          );
      })
    );
  }); */

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}
}
