import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';

import { Category } from '@app/core/models/category';
import { CategoryService } from '@app/core/services/category.service';
import { ProductService } from '@app/core/services/product.service';
import { catalogActions } from '@app/ngrx/actions/catalog.actions';

import { ProductProjection } from '../models/product-projection';
import { QueryBuilderService } from '../services/query-builder.service';

export const productResolver: ResolveFn<ProductProjection[]> = (
  route: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);
  const queryBuilder = inject(QueryBuilderService);
  const productService = inject(ProductService);

  const { category } = route.params;
  return inject(CategoryService)
    .getCategoryByKey(category || '')
    .pipe(
      exhaustMap((param) => {
        queryBuilder.withCategory(param.id);
        return productService.getProducts(queryBuilder.getParams()).pipe(
          catchError(() => {
            router.navigate(['**']);
            return EMPTY;
          }),
          map((value) => value.results),
          tap((value) =>
            store.dispatch(catalogActions.getProductsSuccess({ products: value }))
          )
        );
      })
    );
};

export const categoryResolver: ResolveFn<Category[]> = () => {
  const store = inject(Store);
  const router = inject(Router);
  return inject(CategoryService)
    .getCategories()
    .pipe(
      catchError(() => {
        router.navigate(['**']);
        return EMPTY;
      }),
      map((value) => value.results),
      tap((value) =>
        store.dispatch(catalogActions.getCategoriesSuccess({ categories: value }))
      )
    );
};
