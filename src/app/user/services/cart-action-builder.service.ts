import { Injectable } from '@angular/core';

import { Product } from '@app/shared/models/interfaces/product';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';

import {
  AddDiscountCode,
  AddLineItem,
  CartAction,
  ChangeLineItemQuantity,
  RemoveDiscountCode,
  RemoveLineItem,
} from '../models/cart-update.actions';
import { CartUpdateActions } from '../models/enums/cart-actions.enum';

@Injectable({
  providedIn: 'root',
})
export class CartActionBuilderService {
  private actions: CartAction[] = [];

  public addLineItem(
    product: Product,
    variant: ProductVariant
  ): CartActionBuilderService {
    const action: AddLineItem = {
      action: CartUpdateActions.addLineItem,
      productId: product.id,
      variantId: variant.id,
      custom: {
        type: {
          key: 'lineitemtype',
          typeId: 'type',
        },
        fields: {
          description: product.masterData.current.metaDescription.ru,
          'short-description': product.masterData.current.description?.ru || '',
        },
      },
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

  public changeQuantity(lineItemId: string, quantity: number): CartActionBuilderService {
    const action: ChangeLineItemQuantity = {
      action: CartUpdateActions.ChangeLineItemQuantity,
      lineItemId,
      quantity,
    };

    this.actions.push(action);

    return this;
  }

  public addDiscountCode(code: string): CartActionBuilderService {
    const action: AddDiscountCode = {
      action: CartUpdateActions.addDiscountCode,
      code,
    };

    this.actions.push(action);

    return this;
  }

  public removeDiscountCode(id: string): CartActionBuilderService {
    const action: RemoveDiscountCode = {
      action: CartUpdateActions.removeDiscountCode,
      discountCode: {
        id,
        typeId: 'discount-code',
      },
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
