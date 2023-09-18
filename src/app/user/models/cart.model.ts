import { LocalizedString, ProductType } from '@app/shared/models/interfaces/product';
import {
  Price,
  ProductVariant,
  TypedMoney,
} from '@app/shared/models/interfaces/product-variant';

import { CustomFieldsDraft } from './cart-update.actions';

export interface Cart {
  id: string;
  version: number;
  lineItems: LineItem[];
  totalLineItemQuantity: number;
  discountCodes: DiscountCodeInfo[];
  totalPrice: TypedMoney;
}

export interface DiscountCodeInfo {
  discountCode: DiscountCodeReference;
  state: string;
}

export interface DiscountCodeReference {
  id: string;
  typeId: string;
}
export interface LineItem {
  id: string;
  key?: string;
  productId: string;
  productKey: string;
  variant: ProductVariant;
  quantity: number;
  price: Price;
  totalPrice: TypedMoney;
  custom: CustomFieldsDraft;
  name: LocalizedString;
  productType: ProductType;
}
