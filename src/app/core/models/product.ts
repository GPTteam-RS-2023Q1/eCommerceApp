import { ProductVariant } from './product-variant';

export interface Product {
  id: string;
  version: number;
  masterData: ProductCatalogData;
  productType: ProductType;
  taxCategory: TaxCategory;
  createdAt: string;
  lastModifiedAt: string;
}

export interface ProductCatalogData {
  current: ProductData;
  hasStagedChanges: boolean;
  published: boolean;
  staged: ProductData;
}

export interface ProductData {
  categories: CategoryReference[];
  description?: LocalizedString;
  metaDescription: LocalizedString;
  masterVariant: ProductVariant;
  name: LocalizedString;
  slug: LocalizedString;
  variants: ProductVariant[];
}

export interface CategoryReference {
  id: string;
  typeId: string;
}

export interface LocalizedString {
  en: string;
  ru: string;
}

export interface ProductType {
  id: string;
  typeId: string;
}

export interface TaxCategory {
  id: string;
  typeId: string;
}
