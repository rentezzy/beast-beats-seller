import {
  IGetSession,
  ILoginUser,
  IUpdateUser,
} from "../../../types/auth.types";
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
    updateUserInfo: builder.mutation<null, IUpdateUser>({
      query: (info) => {
        const form = new FormData();
        if (info.name) {
          form.append("name", info.name);
        }
        if (info.email) {
          form.append("email", info.email);
        }
        if (info.photo) {
          form.append("photo", info.photo);
        }

        return {
          url: "booking/create-session",
          method: "POST",
          body: { form },
          headers: {
            "Content-Type": "multipart/form-data;",
          },
          formData: true,
        };
      },
      transformErrorResponse: (res, meta, arg): string => res.data.message,
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useToggleCartMutation,
  useGetUserQuery,
  useGetSessionMutation,
  useUpdateUserInfoMutation,
} = userApi;
