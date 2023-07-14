/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createSlice } from "@reduxjs/toolkit";

export interface IRootState {
  user: {
    email: string | null;
  };
  accessToken: string | null;
}

export const initialState: IRootState = {
  user: {
    email: null,
  },
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setLoggedEmail: (state, action) => {
      state.user.email = action.payload;
    },
  },
});

export const { setAccessToken, setLoggedEmail } = userSlice.actions;

export default userSlice.reducer;
