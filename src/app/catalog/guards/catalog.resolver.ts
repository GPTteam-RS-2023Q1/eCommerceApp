import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { catchError, EMPTY, exhaustMap, map, retry, switchMap, tap } from 'rxjs';

import { catalogActions } from '@app/ngrx/actions/catalog.actions';
import { Category } from '@app/shared/models/interfaces/category';
import { ProductProjectionPageQueryResponse } from '@app/shared/models/interfaces/page-query-results';
import { Product } from '@app/shared/models/interfaces/product';

import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { QueryBuilderService } from '../services/query-builder.service';

export const productsResolver: ResolveFn<ProductProjectionPageQueryResponse> = (
  route: ActivatedRouteSnapshot
) => {
  const store = inject(Store);
  const router = inject(Router);
  const qb = inject(QueryBuilderService);
  const productService = inject(ProductService);

  const { category } = route.params;
  return inject(CategoryService)
    .getCategoryByKey(category)
    .pipe(retry(3))
    .pipe(
      exhaustMap((param) => {
        qb.filterByCategory(param.id);
        Object.entries(route.queryParams).forEach(([key, value]) => {
          qb.queryDictionary[key](value);
        });
        return productService
          .getProducts({
            parameters: qb.getBuildedParams(),
          })
          .pipe(
            catchError(() => {
              router.navigate(['**']);
              return EMPTY;
            }),
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

export const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return inject(ProductService)
    .getProduct(route.params['id'])
    .pipe(
      catchError(() => {
        router.navigate(['**'], { skipLocationChange: true });
        return EMPTY;
      })
    );
};
