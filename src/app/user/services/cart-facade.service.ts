import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, Observable, take } from 'rxjs';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { cartActions } from '@app/ngrx/actions/cart.actions';
import { selectCart } from '@app/ngrx/selectors/cart.selector';
import { Product } from '@app/shared/models/interfaces/product';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';
import { NotificationService } from '@app/shared/services/notofication.service';

import { Cart, LineItem } from '../models/cart.model';
import { CartActionBuilderService } from './cart-action-builder.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartFacadeService {
  public cart$ = this.store.select(selectCart);

  constructor(
    private store: Store,
    private cartActionBuilder: CartActionBuilderService,
    private cartService: CartService,
    private notifyService: NotificationService
  ) {}

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
    product: ProductProjection | Product,
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

  public addLineItem(
    product: ProductProjection | Product,
    variant: ProductVariant
  ): void {
    this.cartService
      .updateCart(this.cartActionBuilder.addLineItem(product, variant).getActions())
      .subscribe((cart) => {
        this.store.dispatch(cartActions.saveCart({ cart }));
        this.notifyService.notify('Продукт добавлен в корзину', 'success');
      });
  }

  public removeLineItem(id: string): void {
    this.cartService
      .updateCart(this.cartActionBuilder.removeLineItem(id).getActions())
      .subscribe((cart) => {
        this.store.dispatch(cartActions.saveCart({ cart }));
        this.notifyService.notify('Продукт удален из корзины', 'success');
      });
  }
}
