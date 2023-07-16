/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../pages/AllBook";

interface IReadList {
  books: IBook[];
  total: number;
}

const initialState: IReadList = {
  books: [],
  total: 0,
};

const readListSlice = createSlice({
  name: "readlist",
  initialState,
  reducers: {
    addToReadList: (state, action) => {
      const existing = state.books.find(
        (book) => book?._id === action.payload._id
      );

      if (!existing) {
        state.books.push({ ...action.payload });
        state.total++
      }
    },
    removeFromReadList: (state, action) => {
      state.books = state.books.filter(
        (book) => book?._id !== action.payload._id
      );
        state.total--
    },
  },
});

export const { addToReadList,removeFromReadList } = readListSlice.actions;

export default readListSlice.reducer;
