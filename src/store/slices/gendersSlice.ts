import { Gender } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GenderState {
  isLoading: boolean;
  items: Gender[];
}

const initialState: GenderState = {
  isLoading: false,
  items: [],
};

export const gendersSlice = createSlice({
  name: "genders",
  initialState,
  reducers: {
    setGenders: (state, action: PayloadAction<Gender[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setGenders } = gendersSlice.actions;

export default gendersSlice.reducer;
