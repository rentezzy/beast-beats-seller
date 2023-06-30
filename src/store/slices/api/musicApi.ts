import { IMusicInfoBody, IMusics, IMusicInfo } from "../../../types/auth.types";
import { api } from "../api";

export const musicApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMusicList: builder.query<IMusics, IMusicInfoBody>({
      query: (payload) => ({
        url: `music/musics?page=${payload.currentPage}&limit=12&author=${payload.author}&genre=${payload.genre}&priceFrom=${payload.priceFrom}&priceTo=${payload.priceTo}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (res: { data: IMusics }) => {
        return res.data;
      },
    }),
    getMusic: builder.query<IMusicInfo, string>({
      query: (id) => ({
        url: `music/musicInfo/${id}`,
        method: "GET",
      }),
      transformResponse: (res: { data: { music: IMusicInfo } }) => {
        return res.data.music;
      },
      providesTags: ["Music"],
    }),
  }),
});
export const { useGetMusicListQuery, useGetMusicQuery } = musicApi;
