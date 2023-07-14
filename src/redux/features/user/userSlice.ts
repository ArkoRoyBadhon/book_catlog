/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: {
    email: string | null;
  };
}

const initialState: IUserState = {
  user: {
    email: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.user.email = "arko";
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
