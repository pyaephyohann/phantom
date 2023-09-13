import { Category } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoriesState {
  isLoading: boolean;
  items: Category[];
}

const initialState: CategoriesState = {
  isLoading: false,
  items: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
