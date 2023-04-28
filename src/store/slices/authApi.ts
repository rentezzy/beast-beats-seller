// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginBody, ILoginUser } from "../../types/auth.types";
import { useActions } from "../hooks";

// const initialState = {
//   userId: "",
//   isLogined: false,
// };

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    headers: {
      withCredentials: "true",
      "Content-Type": "application/json",
      charset: "UTF-8",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMe: builder.query<ILoginUser, any>({
      query: () => "user/me",
      transformResponse: (res: { data: { user: ILoginUser } }) => {
        return res.data.user;
      },
    }),
    postLogin: builder.query<ILoginUser, ILoginBody>({
      query: (payload) => ({
        url: "user/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetMeQuery, usePostLoginQuery } = authApi;
