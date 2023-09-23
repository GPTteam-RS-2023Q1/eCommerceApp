import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map, catchError, of } from 'rxjs';

import { CartService } from '@app/user/services/cart.service';
import { authAction } from '../actions/auth.actions';
import { cartActions } from '../actions/cart.actions';

@Injectable()
export class CartEffects {
  public getCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAction.autoLoginSuccess, authAction.loginSuccess),
      exhaustMap(() => {
        return this.cartService.getActiveCart().pipe(
          map((response) => {
            return cartActions.saveCart({ cart: response });
          }),
          catchError(() => of())
        );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService
  ) {}
}
