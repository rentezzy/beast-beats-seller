import { IMusicInfoBody, IMusics } from "../../../types/auth.types";
import { api } from "../api";

export const musicApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMusicList: builder.mutation<IMusics, IMusicInfoBody>({
      query: (payload) => ({
        url: `music/musics?page=${payload.currentPage}&limit=12`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (res: { data: IMusics }) => {
        return res.data;
      },
    }),
  }),
});
export const { useGetMusicListMutation } = musicApi;
