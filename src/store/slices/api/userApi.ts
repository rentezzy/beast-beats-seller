import { api } from "../api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleCart: builder.mutation({
      query: (song) => `user/cart/${song}`,
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useToggleCartMutation } = userApi;
