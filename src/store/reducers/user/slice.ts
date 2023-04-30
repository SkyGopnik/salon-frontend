import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "src/types/user";

interface LinksState {
  user: User | null
}

const initialState: LinksState = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update(state, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
});

export const userReducer = userSlice.reducer;
