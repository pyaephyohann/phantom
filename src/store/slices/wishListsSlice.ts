import { WishList } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WishListsState {
  isLoading: boolean;
  items: WishList[];
}

const initialState: WishListsState = {
  isLoading: false,
  items: [],
};

export const wishListsSlice = createSlice({
  name: "wishLists",
  initialState,
  reducers: {
    setWishLists: (state, action: PayloadAction<WishList[]>) => {
      state.items = action.payload;
    },
    addToWishLists: (state, action: PayloadAction<WishList>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromWishLists: (
      state,
      action: PayloadAction<{ productId: number; userId: number }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.userId === action.payload.userId &&
          item.productId !== action.payload.productId
      );
    },
  },
});

export const { setWishLists, addToWishLists, removeFromWishLists } =
  wishListsSlice.actions;

export default wishListsSlice.reducer;
