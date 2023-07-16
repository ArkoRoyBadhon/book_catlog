/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-backend-alpha.vercel.app",
    prepareHeaders: (headers) => {
      // const authState = (getState() as RootState).user
      const Token = localStorage.getItem("access_token");
      // const Token = authState.accessToken
      // console.log("Token", authState.accessToken);

      if (Token) {
        headers.set("authorization", `Bearer ${Token}`);
      }

      return headers;
    },
  }),
  refetchOnMountOrArgChange: 30,
  tagTypes: ["user", "book", "review"],
  endpoints: () => ({}),
});
