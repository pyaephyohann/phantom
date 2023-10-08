import { Product } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilteredProductsState {
  isLoading: boolean;
  filteredProductsBySize: Product[];
  filteredProductsByColor: Product[];
  filteredProductsByGender: Product[];
}

const initialState: FilteredProductsState = {
  isLoading: false,
  filteredProductsBySize: [],
  filteredProductsByColor: [],
  filteredProductsByGender: [],
};

export const filteredProductsSlice = createSlice({
  name: "filteredProducts",
  initialState,
  reducers: {
    setFilteredProductsBySize: (state, action: PayloadAction<Product[]>) => {
      state.filteredProductsBySize = action.payload;
    },
    setFilteredProductsByColor: (state, action: PayloadAction<Product[]>) => {
      state.filteredProductsByColor = action.payload;
    },
    setFilteredProductsByGender: (state, action: PayloadAction<Product[]>) => {
      state.filteredProductsByGender = action.payload;
    },
  },
});

export const {
  setFilteredProductsBySize,
  setFilteredProductsByColor,
  setFilteredProductsByGender,
} = filteredProductsSlice.actions;

export default filteredProductsSlice.reducer;
