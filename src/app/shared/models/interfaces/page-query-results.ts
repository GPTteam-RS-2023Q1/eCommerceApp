import { ProductProjection } from '@app/catalog/models/product-projection';

import { Category } from './category';
import { Product } from './product';

export interface ProductProjectionPageQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductProjection[];
}

export interface ProductPageQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
}

export interface CategoryPageQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Category[];
}
