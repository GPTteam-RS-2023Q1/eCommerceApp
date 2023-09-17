import { Injectable } from '@angular/core';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { Product } from '@app/shared/models/interfaces/product';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';

import { AddLineItem, CartAction, RemoveLineItem } from '../models/cart-update.actions';
import { CartUpdateActions } from '../models/enums/cart-actions.enum';

@Injectable({
  providedIn: 'root',
})
export class CartActionBuilderService {
  private actions: CartAction[] = [];

  public addLineItem(
    product: Product | ProductProjection,
    variant: ProductVariant
  ): CartActionBuilderService {
    const action: AddLineItem = {
      action: CartUpdateActions.addLineItem,
      productId: product.id,
      variantId: variant.id,
    };

    if (variant.prices[0].channel) {
      action.distributionChannel = variant.prices[0].channel;
    }

    this.actions.push(action);

    return this;
  }

  public removeLineItem(lineItemId: string): CartActionBuilderService {
    const action: RemoveLineItem = {
      action: CartUpdateActions.removeLineItem,
      lineItemId,
    };

    this.actions.push(action);

    return this;
  }

  public getActions(): CartAction[] {
    const { actions } = this;
    this.actions = [];
    return actions;
  }
}
