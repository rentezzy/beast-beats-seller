import { IMusicInfoBody, IMusics } from "../../../types/auth.types";
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
  }),
});
export const { useGetMusicListQuery } = musicApi;
