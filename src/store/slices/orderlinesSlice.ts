import { Orderline } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface OrderlinesState {
  isLoading: boolean;
  items: Orderline[];
}

const initialState: OrderlinesState = {
  isLoading: false,
  items: [],
};

export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action: PayloadAction<Orderline[]>) => {
      state.items = action.payload;
    },
    addOrderlines: (state, action: PayloadAction<Orderline[]>) => {
      action.payload.forEach((item) => state.items.push(item));
    },
  },
});

export const { setOrderlines, addOrderlines } = orderlinesSlice.actions;

export default orderlinesSlice.reducer;
