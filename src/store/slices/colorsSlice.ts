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
  },
});

export const { setColors } = colorsSlice.actions;

export default colorsSlice.reducer;
