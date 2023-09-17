import { TypedMoney } from '@app/shared/models/interfaces/product-variant';

export interface DiscountCode {
  id: string;
  code: string;
  version: number;
  cartDiscounts: CartDiscountReference[];
}

export interface CartDiscountReference {
  id: string;
  typeId: 'cart-discount';
}
export interface CartDiscount {
  id: string;
  version: string;
  value: CartDiscountValue;
  sortOdred: number;
  name: { en: string };
}

export interface CartDiscountValue {
  type: 'relative' | 'absolute';
  money?: TypedMoney;
  permyriad?: number;
}
