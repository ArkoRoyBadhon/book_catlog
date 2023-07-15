/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/book/createbook`,
        method: "POST",
        body: data,
      }),
    }),
    getAllBooks: builder.query({
      query: () => `api/v1/book/getallbooks?sortby=PublicationDate&orderBy=asc`,
    }),
  }),
});

export const { useCreateBookMutation, useGetAllBooksQuery } = bookApi;
