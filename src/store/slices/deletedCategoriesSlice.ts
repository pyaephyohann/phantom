import { Category } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DeletedCategoriesState {
  isLoading: boolean;
  items: Category[];
}

const initialState: DeletedCategoriesState = {
  isLoading: false,
  items: [],
};

export const deletedCategoriesSlice = createSlice({
  name: "deletedCategories",
  initialState,
  reducers: {
    setDeletedCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = action.payload;
    },
    addDeletedCategory: (state, action: PayloadAction<Category>) => {
      state.items = [...state.items, action.payload];
    },
    removeDeletedCategory: (state, action: PayloadAction<Category>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setDeletedCategories,
  addDeletedCategory,
  removeDeletedCategory,
} = deletedCategoriesSlice.actions;

export default deletedCategoriesSlice.reducer;
