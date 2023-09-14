import { ProductVariant } from '@app/shared/models/interfaces/product-variant';

export interface Cart {
  id: string;
  version: number;
  lineItems: LineItem[];
}

export interface LineItem {
  id: string;
  key?: string;
  productId: string;
  productKey: string;
  variant: ProductVariant;
}
