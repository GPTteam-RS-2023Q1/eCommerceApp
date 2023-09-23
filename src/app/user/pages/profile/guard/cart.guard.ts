import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { map } from 'rxjs';

import { selectCart } from '@app/ngrx/selectors/cart.selector';

export const canActivateCart: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCart).pipe(
    map((cart) => {
      if (!cart) {
        router.navigate(['store', 'catalog', 'clothes']);
      }
      return !!cart;
    })
  );
};
