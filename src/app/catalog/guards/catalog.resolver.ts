import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { catchError, EMPTY, exhaustMap, map, retry, switchMap, tap } from 'rxjs';

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
    .getCategoryByKey(category)
    .pipe(retry(3))
    .pipe(
      exhaustMap((param) => {
        return productService
          .getProducts(queryBuilder.filterByCategory(param.id).getBuildedParams())
          .pipe(
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

export const categoryResolver: ResolveFn<Category> = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);
  const categorySerivce = inject(CategoryService);
  return categorySerivce.getCategories().pipe(
    catchError(() => {
      router.navigate(['**']);
      return EMPTY;
    }),
    map((value) => value.results),
    tap((value) => {
      store.dispatch(catalogActions.getCategoriesSuccess({ categories: value }));
    }),
    switchMap(() => {
      return categorySerivce.getCategoryByKey(route.params['category']);
    })
  );
};
