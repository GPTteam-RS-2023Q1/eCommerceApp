import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState, cartStateName } from '../state.model';

export const selectCartState = createFeatureSelector<CartState>(cartStateName);

export const selectCart = createSelector(selectCartState, (state) => state.cart);

export const selectCartId = createSelector(selectCartState, (state) => state.cart?.id);
