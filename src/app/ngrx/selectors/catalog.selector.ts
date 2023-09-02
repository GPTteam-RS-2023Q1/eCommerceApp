import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CatalogState, catalogStateName } from '../state.model';

export const selectCatalogState = createFeatureSelector<CatalogState>(catalogStateName);

export const selectCatalogProducts = createSelector(
  selectCatalogState,
  (state) => state.products
);

export const selectCatalogCategories = createSelector(
  selectCatalogState,
  (state) => state.categories
);
