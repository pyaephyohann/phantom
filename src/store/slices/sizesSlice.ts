import { Size } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SizesState {
  isLoading: boolean;
  items: Size[];
}

const initialState: SizesState = {
  isLoading: false,
  items: [],
};

export const sizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {
    setSizes: (state, action: PayloadAction<Size[]>) => {
      state.items = action.payload;
    },
    addSize: (state, action: PayloadAction<Size>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setSizes, addSize } = sizesSlice.actions;

export default sizesSlice.reducer;
