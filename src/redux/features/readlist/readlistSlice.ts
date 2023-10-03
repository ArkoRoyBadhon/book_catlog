/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice } from "@reduxjs/toolkit";

export type IReadBook = {
  [x: string]: any;
  _id?: string;
  Title: string;
  Author: string;
  Genre: string;
  // status: string;
  PublicationDate: any;
  finish?: boolean
};

interface IReadList {
  books: IReadBook[];
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
        // state.books.push({ ...action.payload, status: "Read Soon" });
        state.books.push({ ...action.payload, finish: false });
        state.total++;
      }
    },
    removeFromReadList: (state, action) => {
      state.books = state.books.filter(
        (book) => book?._id !== action.payload._id
      );
      state.total--;
    },
    updateReadList: (state, action) => {
      const updatedBookIndex = state.books.findIndex(
        (book) => book?._id === action.payload._id
      );

      console.log("inside payload", action.payload);
      console.log("updatedBookIndex", updatedBookIndex);

      if (updatedBookIndex !== -1) {
        // Create a copy of the book with updated properties
        const updatedBook = {
          ...state.books[updatedBookIndex],
          ...action.payload
        };

        // Replace the old book with the updated book in the array
        state.books[updatedBookIndex] = updatedBook;
      }
    },
  },
});

export const { addToReadList, removeFromReadList, updateReadList } =
  readListSlice.actions;

export default readListSlice.reducer;
