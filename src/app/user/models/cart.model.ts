import { Price, ProductVariant } from '@app/shared/models/interfaces/product-variant';
import { CurrencyCode } from '@app/shared/models/enums/currency-code';

export interface Cart {
  id: string;
  version: number;
  lineItems: LineItem[];
  totalLineItemQuantity: number;
  discountCodes: DiscountCodeInfo[];
  totalPrice: CentPrecisionMoney;
}

export interface DiscountCodeInfo {
  discountCode: DiscountCodeReference;
  state: string;
}

export interface DiscountCodeReference {
  id: string;
  typeId: string;
}

export interface CentPrecisionMoney {
  centAmount: number;
  currencyCode: CurrencyCode;
  type: string;
  fractionDigits: number;
}

export interface LineItem {
  id: string;
  key?: string;
  productId: string;
  productKey: string;
  variant: ProductVariant;
  quantity: number;
  price: Price;
}
