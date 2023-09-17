import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

import { authAction } from '@app/ngrx/actions/auth.actions';
import { cartActions } from '@app/ngrx/actions/cart.actions';
import { selectCart } from '@app/ngrx/selectors/cart.selector';

import { CartAction } from '../models/cart-update.actions';
import { Cart } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  public cart$ = this.store.select(selectCart);
  constructor(
    private http: HttpClient,
    private store: Store,
    private actions$: Actions
  ) {}

  public createCart(): Observable<Cart> {
    return this.http.post<Cart>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/me/carts`,
      { currency: 'USD' }
    );
  }

  public getActiveCart(): Observable<Cart> {
    return this.http
      .get<Cart>(
        `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/me/active-cart`
      )
      .pipe(
        catchError(() => {
          return this.createCart();
        })
      );
  }

  public updateCartRequest(cart: Cart, actions: CartAction[]): Observable<Cart> {
    return this.http.post<Cart>(
      `${environment.CTP_API_URL}/${environment.CTP_PROJECT_KEY}/me/carts/${cart?.id}`,
      { version: cart.version, actions }
    );
  }

  public updateCart(actions: CartAction[]): Observable<Cart> {
    return this.cart$.pipe(
      take(1),
      exhaustMap((cart) => {
        if (!cart) {
          this.store.dispatch(authAction.anonymousSessionStart());
          return this.actions$.pipe(
            ofType(cartActions.saveCart),
            exhaustMap((action) => {
              return this.updateCartRequest(action.cart, actions);
            })
          );
        }
        return this.updateCartRequest(cart, actions);
      })
    );
  }
}
