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
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.items = [
        ...state.items.map((item) =>
          action.payload.id === item.id ? action.payload : item
        ),
      ];
    },
    deleteProduct: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter((item) => action.payload.id !== item.id);
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
