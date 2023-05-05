import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginBody, ILoginUser } from "../../types/auth.types";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MAIN_API,
    headers: {
      withCredentials: "true",
      "Content-Type": "application/json",
      charset: "UTF-8",
    },
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<ILoginUser, any>({
      query: () => "user/me",
      transformResponse: (res: { data: { user: ILoginUser } }) => {
        return res.data.user;
      },
      providesTags: ["User"],
    }),
    postLogin: builder.query<ILoginUser, ILoginBody>({
      query: (payload) => ({
        url: "user/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (res: { data: { user: ILoginUser } }) => {
        return res.data.user;
      },
      providesTags: ["User"],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery, usePostLoginQuery, useLogOutMutation } = authApi;
