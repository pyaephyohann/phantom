import { Order } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  isLoading: boolean;
  items: Order[];
}

const initialState: OrdersState = {
  isLoading: false,
  items: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.items = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setOrders, addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
