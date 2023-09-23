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
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items = [...state.items, action.payload];
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setCategories, addCategory, updateCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
