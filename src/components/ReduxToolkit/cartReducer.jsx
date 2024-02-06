import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item._id === itemId);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = newQuantity;
      }
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== itemId);
    },
  },
});

export const { setCartItems, updateCartItemQuantity, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
