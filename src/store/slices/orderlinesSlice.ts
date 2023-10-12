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
    updateOrderline: (state, action: PayloadAction<Orderline>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setOrderlines, addOrderlines, updateOrderline } =
  orderlinesSlice.actions;

export default orderlinesSlice.reducer;
