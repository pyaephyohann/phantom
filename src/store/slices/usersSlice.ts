import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UsersState {
  isLoading: boolean;
  items: User[];
}

const initialState: UsersState = {
  isLoading: false,
  items: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setUsers, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
