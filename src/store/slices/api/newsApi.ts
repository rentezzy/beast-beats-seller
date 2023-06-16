import { INewsPost } from "../../../types/auth.types";
import { api } from "../api";

export const newsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getnewsPosts: builder.query<Array<INewsPost>, any>({
      query: (page: number) => `news/newsPosts?page=${page}&limit=12`,
      transformResponse: (res: { data: { newsPosts: Array<INewsPost> } }) => {
        return res.data.newsPosts;
      },
      providesTags: ["Posts"],
    }),
  }),
});
export const { useGetnewsPostsQuery } = newsApi;
