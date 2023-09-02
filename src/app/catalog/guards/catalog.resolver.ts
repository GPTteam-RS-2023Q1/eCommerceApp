import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { catchError, EMPTY, map, tap } from 'rxjs';

import { Category } from '@app/core/models/category';
import { CategoryService } from '@app/core/services/category.service';
import { catalogActions } from '@app/ngrx/actions/catalog.actions';

/* export const productResolver: ResolveFn<Product[]> = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const router = inject(Router);
  return inject(ProductService)
    .getProducts(route.paramMap.get('category') || '')
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
}; */

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
