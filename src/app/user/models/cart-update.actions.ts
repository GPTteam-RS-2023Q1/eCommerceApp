import { ChannelResourceIdentifier } from '@app/shared/models/interfaces/product-variant';

import { CartUpdateActions } from './enums/cart-actions.enum';

export interface CartAction {
  action: CartUpdateActions;
}

export interface AddLineItem extends CartAction {
  productId: string;
  variantId: number;
  quantity?: number;
  distributionChannel?: ChannelResourceIdentifier;
}

export interface RemoveLineItem extends CartAction {
  lineItemId: string;
}
export interface AddDiscountCode extends CartAction {
  code: string;
}

export interface RemoveDiscountCode extends CartAction {
  discountCode: {
    id: string;
    typeId: 'discount-code';
  };
}
