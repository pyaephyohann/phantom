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
  },
});

export const { setDeletedCategories } = deletedCategoriesSlice.actions;

export default deletedCategoriesSlice.reducer;
