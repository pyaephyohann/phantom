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
    updateSize: (state, action: PayloadAction<Size>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setSizes, addSize, updateSize } = sizesSlice.actions;

export default sizesSlice.reducer;
