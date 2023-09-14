import { Injectable } from '@angular/core';

import { ProductVariant } from '@app/shared/models/interfaces/product-variant';

import { AddLineItem, CartAction } from '../models/cart-update.actions';
import { CartUpdateActions } from '../models/enums/cart-actions.enum';

@Injectable({
  providedIn: 'root',
})
export class CartActionBuilderService {
  private actions: CartAction[] = [];

  public addLineItem(
    productId: string,
    variant: ProductVariant
  ): CartActionBuilderService {
    const action: AddLineItem = {
      action: CartUpdateActions.addLineItem,
      productId,
      variantId: variant.id,
    };

    if (variant.prices[0].channel) {
      action.distributionChannel = variant.prices[0].channel;
    }

    this.actions.push(action);

    return this;
  }

  public getActions(): CartAction[] {
    return this.actions;
  }
}
