import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, Observable, take } from 'rxjs';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { cartActions } from '@app/ngrx/actions/cart.actions';
import { selectCart } from '@app/ngrx/selectors/cart.selector';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';

import { Cart, LineItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartFacadeService {
  public cart$ = this.store.select(selectCart);

  constructor(private readonly store: Store) {}

  public getCart(): void {
    return this.store.dispatch(cartActions.getCart());
  }

  public saveCart(cart: Cart): void {
    return this.store.dispatch(cartActions.saveCart({ cart }));
  }

  public getLineItemById(id: string): Observable<LineItem | undefined> {
    return this.cart$.pipe(map((cart) => cart?.lineItems.find((item) => item.id === id)));
  }

  public getLineItemByProductandVariant(
    product: ProductProjection,
    variant: ProductVariant
  ): Observable<LineItem | undefined> {
    return this.cart$.pipe(
      map((cart) =>
        cart?.lineItems.find(
          (item) => item.productId === product.id && item.variant.id === variant.id
        )
      ),
      take(1)
    );
  }
}
