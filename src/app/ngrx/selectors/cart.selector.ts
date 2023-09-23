import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState, cartStateName } from '../state.model';

export const selectCartState = createFeatureSelector<CartState>(cartStateName);

export const selectCart = createSelector(selectCartState, (state) => state.cart);

export const selectCartId = createSelector(selectCartState, (state) => state.cart?.id);

export const selectCountCartItem = createSelector(
  selectCartState,
  (state) => state.cart?.totalLineItemQuantity
);

export const selectDiscounts = createSelector(
  selectCartState,
  (state) => state.cart?.discountCodes
);

export const selectCurrency = createSelector(
  selectCartState,
  (state) => state.cart?.totalPrice.currencyCode
);

export const selectPriceWithoutDiscount = createSelector(selectCartState, (state) => {
  return state.cart?.lineItems.reduce((acc, item) => {
    const price = item.price.discounted
      ? item.price.discounted.value.centAmount
      : item.price.value.centAmount;
    return acc + (price * item.quantity) / 100;
  }, 0);
});
