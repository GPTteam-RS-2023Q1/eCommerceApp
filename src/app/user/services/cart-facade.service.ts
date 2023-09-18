import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, Observable, take, Subject } from 'rxjs';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { cartActions } from '@app/ngrx/actions/cart.actions';
import { selectCart, selectDiscounts } from '@app/ngrx/selectors/cart.selector';
import { Product } from '@app/shared/models/interfaces/product';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';
import { NotificationService } from '@app/shared/services/notofication.service';

import { Cart, LineItem } from '../models/cart.model';
import { CartActionBuilderService } from './cart-action-builder.service';
import { CartService } from './cart.service';
import { DiscountInfo } from '../models/discounts.model';

@Injectable({
  providedIn: 'root',
})
export class CartFacadeService {
  public cart$ = this.store.select(selectCart);

  public cartDiscounts = new Subject<DiscountInfo[]>();

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
      .subscribe(() => {
        this.notifyService.notify('Продукт добавлен в корзину', 'success');
      });
  }

  public removeLineItem(id: string): void {
    this.cartService
      .updateCart(this.cartActionBuilder.removeLineItem(id).getActions())
      .subscribe(() => {
        this.notifyService.notify('Продукт удален из корзины', 'success');
      });
  }

  public getCartDiscounts(): void {
    this.store
      .select(selectDiscounts)
      .pipe(take(1))
      .subscribe((discounts) => {
        this.cartService.getCartDiscounts(discounts ?? []).subscribe((cartDiscounts) => {
          this.cartDiscounts.next(cartDiscounts);
        });
      });
  }

  public addDiscountCode(code: string): void {
    this.cartActionBuilder.addDiscountCode(code);
    this.cartService.updateCart(this.cartActionBuilder.getActions()).subscribe(() => {
      this.notifyService.notify('Промокод успешно применен', 'success');
      this.getCartDiscounts();
    });
  }

  public removeDiscountCode(id: string): void {
    this.cartActionBuilder.removeDiscountCode(id);
    this.cartService.updateCart(this.cartActionBuilder.getActions()).subscribe(() => {
      this.notifyService.notify('Промокод успешно удален', 'success');
      this.getCartDiscounts();
    });
  }
}
