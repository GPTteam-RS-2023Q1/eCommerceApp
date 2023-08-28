import { Product } from './product';

export interface ProductPageQueryResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Product[];
}
