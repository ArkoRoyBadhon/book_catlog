/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createSlice } from "@reduxjs/toolkit";

export interface IRootState {
  user: {
    email: string | null;
    id: string | null;
    name: {
      firstName: string | null;
      lastName: string | null;
    };
  };
  accessToken: string | null;
}

export const initialState: IRootState = {
  user: {
    email: null,
    id: null,
    name: {
      firstName: null,
      lastName: null,
    },
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
    setLoggedInfo: (state, action) => {
      state.user.email = action.payload.email;
      state.user.id = action.payload._id;
      state.user.name.firstName = action.payload.firstName;
      state.user.name.lastName = action.payload.lastName;
    },
  },
});

export const { setAccessToken, setLoggedInfo } = userSlice.actions;

export default userSlice.reducer;
