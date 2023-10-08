import { Product } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
  isLoading: boolean;
  items: Product[];
}

const initialState: CartState = {
  isLoading: false,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
