/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
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
