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
