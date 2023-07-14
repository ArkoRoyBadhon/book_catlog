/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const Token = localStorage.getItem("access_token");
      console.log("Token", Token);

      if (Token) {
        headers.set("authorization", `Bearer ${Token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: () => ({}),
});
