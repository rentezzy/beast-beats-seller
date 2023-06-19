import { INewsPosts } from "../../../types/auth.types";
import { api } from "../api";

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNewsPosts: builder.query<INewsPosts, number>({
      query: (page) => `news/newsPosts?page=${page}&limit=12`,
      transformResponse: (res: { data: INewsPosts }) => {
        return res.data;
      },
    }),
    toggleLikeNewsPost: builder.mutation<null, string>({
      query: (postId) => ({
        url: `news/likePost?_id=${postId}`,
        method: "POST",
      }),
    }),
  }),
});
export const { useGetNewsPostsQuery, useToggleLikeNewsPostMutation } = newsApi;
