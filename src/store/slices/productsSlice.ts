import { Product } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  isLoading: boolean;
  items: Product[];
}

const initialState: ProductsState = {
  isLoading: false,
  items: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setProducts, addProduct } = productsSlice.actions;

export default productsSlice.reducer;
