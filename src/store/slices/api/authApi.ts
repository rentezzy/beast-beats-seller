import { api } from "../api";
import { ILoginBody, ILoginUser, ISignupBody } from "../../../types/auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<ILoginUser, any>({
      query: () => "user/me",
      transformResponse: (res: { data: { user: ILoginUser } }) => {
        return res.data.user;
      },
      providesTags: ["User"],
    }),
    postLogin: builder.mutation<ILoginUser, ILoginBody>({
      query: (payload) => ({
        url: "user/login",
        method: "POST",
        body: payload,
      }),
      transformResponse: (res: { data: { user: ILoginUser } }) => {
        return res.data.user;
      },
      transformErrorResponse: (res, meta, arg): string => res.data.message,
      invalidatesTags: ["User"],
    }),
    postSignup: builder.mutation<ILoginUser, ISignupBody>({
      query: (payload) => ({
        url: "user/signup",
        method: "POST",
        body: payload,
      }),
      transformResponse: (res: { data: { user: ILoginUser } }) => {
        return res.data.user;
      },
      transformErrorResponse: (res, meta, arg): string => res.data.message,
      invalidatesTags: ["User"],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "user/login",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  usePostLoginMutation,
  usePostSignupMutation,
  useLogOutMutation,
} = authApi;
