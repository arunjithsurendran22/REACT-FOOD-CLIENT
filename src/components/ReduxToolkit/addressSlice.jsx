// addressSlice.js

import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    selectedAddress: null,
  },
  reducers: {
    setAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export const selectAddress = (state) => state.address.selectedAddress;
export default addressSlice.reducer;
