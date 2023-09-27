import { Color } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ColorsState {
  isLoading: boolean;
  items: Color[];
}

const initialState: ColorsState = {
  isLoading: false,
  items: [],
};

export const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<Color[]>) => {
      state.items = action.payload;
    },
    addColor: (state, action: PayloadAction<Color>) => {
      state.items = [...state.items, action.payload];
    },
    updateColor: (state, action: PayloadAction<Color>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setColors, addColor, updateColor } = colorsSlice.actions;

export default colorsSlice.reducer;
