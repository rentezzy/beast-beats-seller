import { IGetSession, ILoginUser } from "../../../types/auth.types";
import { api } from "../api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleCart: builder.mutation({
      query: (song) => `user/cart/${song}`,
      invalidatesTags: ["User"],
    }),
    getUser: builder.query<ILoginUser, string>({
      query: (id) => `user/user/${id}`,
      transformResponse: (res: { data: { user: ILoginUser } }) => res.data.user,
    }),
    getSession: builder.mutation<IGetSession, string[]>({
      query: (cart) => ({
        url: "booking/create-session",
        method: "POST",
        body: { cart },
      }),
    }),
  }),
});
export const { useToggleCartMutation, useGetUserQuery, useGetSessionMutation } =
  userApi;
