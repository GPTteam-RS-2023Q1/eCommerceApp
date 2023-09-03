import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';

import { catchError, EMPTY } from 'rxjs';

import { Product } from '@app/core/models/product';
import { ProductService } from '@app/core/services/product.service';

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
