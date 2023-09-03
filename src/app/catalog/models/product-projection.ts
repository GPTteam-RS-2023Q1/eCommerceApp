import {
  CategoryReference,
  LocalizedString,
  ProductType,
} from '@app/core/models/product';
import { ProductVariant } from '@app/core/models/product-variant';

export interface ProductProjection {
  id: string;
  key: string;
  productType: ProductType;
  name: LocalizedString;
  description: LocalizedString;
  slug: LocalizedString;
  categories: CategoryReference;
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  masterVariant: ProductVariant;
  variants: ProductVariant[];
}
