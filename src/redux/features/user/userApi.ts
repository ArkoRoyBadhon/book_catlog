/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";



const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/api/v1/auth/user`,
      }),
    }),
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useLoginUserMutation } =
  userApi;
