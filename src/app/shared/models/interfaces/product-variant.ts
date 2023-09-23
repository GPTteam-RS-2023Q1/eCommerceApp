import { CurrencyCode } from '../enums/currency-code';

export interface ProductVariant {
  id: number;
  key: string;
  sku: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
}

export interface Price {
  id: string;
  key: string;
  value: TypedMoney;
  countryCode: `${string}${string}`;
  discounted?: DiscountedPrice;
  channel?: ChannelResourceIdentifier;
}

export interface TypedMoney {
  centAmount: number;
  currencyCode: CurrencyCode;
  type: 'centPrecision';
  fractionDigits: number;
}

export interface DiscountedPrice {
  value: TypedMoney;
  discount: ProductDiscountReference;
}

export interface ProductDiscountReference {
  id: string;
  typeId: string;
}

export interface Image {
  url: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  h: number;
  w: number;
}

export interface Attribute {
  name: string;
  value: any;
}

export interface ChannelResourceIdentifier {
  id: string;
  typeId: 'channel';
}
