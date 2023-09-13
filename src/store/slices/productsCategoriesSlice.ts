import { ProductCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductCategoriesState {
  isLoading: boolean;
  items: ProductCategory[];
}

const initialState: ProductCategoriesState = {
  isLoading: false,
  items: [],
};

export const productsCategoriesSlice = createSlice({
  name: "productsCategories",
  initialState,
  reducers: {
    setProductsCategories: (
      state,
      action: PayloadAction<ProductCategory[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setProductsCategories } = productsCategoriesSlice.actions;

export default productsCategoriesSlice.reducer;
