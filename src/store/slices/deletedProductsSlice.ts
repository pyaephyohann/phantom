import { Product } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DeletedProductState {
  isLoading: boolean;
  items: Product[];
}

const initialState: DeletedProductState = {
  isLoading: false,
  items: [],
};

export const deletedProductsSlice = createSlice({
  name: "deletedProducts",
  initialState,
  reducers: {
    setDeletedProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addDeletedProduct: (state, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
    },
    removeDeletedProduct: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setDeletedProducts, addDeletedProduct, removeDeletedProduct } =
  deletedProductsSlice.actions;

export default deletedProductsSlice.reducer;
