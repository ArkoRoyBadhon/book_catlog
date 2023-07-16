/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
      invalidatesTags: ["book"]
    }),
    getAllBooks: builder.query({
      query: () => `api/v1/book/getallbooks?sortby=PublicationDate&orderBy=asc`,
      providesTags: ["book"]
    }),
    deleteBook: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/api/v1/book/deletebook/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"]
    }),
    getSingleBook: builder.query({
      query: (id: string | undefined) => `api/v1/book/getallbooks/${id}`,
      providesTags: ["book"]
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useGetSingleBookQuery
} = bookApi;
