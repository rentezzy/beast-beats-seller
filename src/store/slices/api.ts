import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IError } from "../../types/auth.types";

export const api = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MAIN_API,
    headers: {
      withCredentials: "true",
      "Content-Type": "application/json",
      charset: "UTF-8",
    },
    credentials: "include",
  }) as BaseQueryFn<string | FetchArgs, unknown, IError, {}>,
  tagTypes: ["User","App","Music"],
  endpoints: () => ({}),
});
