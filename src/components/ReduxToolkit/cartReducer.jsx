// cartReducer.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  grandTotal: 0, // Initialize grandTotal in the initial state
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
        // If the item is already in the cart, increase its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If it's a new item, add it to the cart
        state.cartItems.push(newItem);
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === itemId
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = newQuantity;
      }
    },
    removeCartItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    updateGrandTotal: (state, action) => {
      state.grandTotal = action.payload; 
      console.log(state.grandTotal);
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
