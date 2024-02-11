import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === itemId);
      if (item) {
        item.quantity = newQuantity;
      }
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    updateGrandTotal: (state, action) => {
      state.grandTotal = action.payload;
    },
  },
});

export const {
  setCartItems,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  updateGrandTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
