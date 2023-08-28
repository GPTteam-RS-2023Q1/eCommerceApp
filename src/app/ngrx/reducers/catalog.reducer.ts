import { createReducer, on } from '@ngrx/store';

import { catalogActions } from '../actions/catalog.actions';
import { CatalogState } from '../state.model';

const initialState: CatalogState = {
  products: null,
};

export const catalogReducer = createReducer(
  initialState,
  on(catalogActions.getProductsSuccess, (state, { products }): CatalogState => {
    return {
      ...state,
      products,
    };
  })
);
