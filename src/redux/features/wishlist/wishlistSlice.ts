/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../pages/AllBook";

interface IWishList {
  books: IBook[];
  total: number;
}

const initialState: IWishList = {
  books: [],
  total: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const existing = state.books.find(
        (book) => book?._id === action.payload._id
      );

      if (!existing) {
        state.books.push({ ...action.payload });
        state.total++
      }
    },
    removeFromWishList: (state, action) => {
      state.books = state.books.filter(
        (book) => book?._id !== action.payload._id
      );
        state.total--
    },
  },
});

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
