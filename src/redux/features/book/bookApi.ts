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
      invalidatesTags: ["book"],
    }),
    getAllBooks: builder.query({
      query: (searchValue) => ({
        url: `api/v1/book/getallbooks`,
        params: {
          sortBy: "PublicationDate",
          sortOrder: "desc",
          searchTerm: searchValue,
        },
      }),
      providesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/api/v1/book/deletebook/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    getSingleBook: builder.query({
      query: (id: string | undefined) => `api/v1/book/getbook/${id}`,
      providesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/book/updatebook/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/book/postReview/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["review", "book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useDeleteBookMutation,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  usePostReviewMutation,
} = bookApi;
