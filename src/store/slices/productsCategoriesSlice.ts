import { config } from "@/config";
import { ProductCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductCategoriesState {
  isLoading: boolean;
  items: ProductCategory[];
}

const initialState: ProductCategoriesState = {
  isLoading: false,
  items: [],
};

export const fetchProductsCategories = createAsyncThunk(
  "productsCategories/fetchProductsCategories",
  async (payload, thunkAPI) => {
    const response = await fetch(
      `${config.apiBaseUrl}/backoffice/productsCategories`
    );
    const productsCategories = await response.json();
    thunkAPI.dispatch(setProductsCategories(productsCategories));
  }
);

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
