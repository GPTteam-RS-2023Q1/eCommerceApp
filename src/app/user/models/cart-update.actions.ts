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
  custom: CustomFieldsDraft;
}

export interface RemoveLineItem extends CartAction {
  lineItemId: string;
}

export interface ChangeLineItemQuantity extends CartAction {
  lineItemId: string;
  quantity: number;
}

export interface CustomFieldsDraft {
  type: TypeResourceIdentifier;
  fields: CustomFields;
}

export interface TypeResourceIdentifier {
  key: string;
  typeId: 'type';
}

export interface CustomFields {
  description: string;
  'short-description': string;
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
