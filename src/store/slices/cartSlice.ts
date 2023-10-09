import { Product } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartState {
  isLoading: boolean;
  items: CartItem[];
}

const initialState: CartState = {
  isLoading: false,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
