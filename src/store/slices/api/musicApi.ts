import {
  IMusics,
  IMusicInfo,
  IMusicComment,
  IMusicInfoBody,
  IMusicCommentBody,
  IMusicCommentResponse,
  IMusicCommentGetPayload,
} from "../../../types/api.types";
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

    getMusicCommentsList: builder.query<
      IMusicCommentResponse,
      IMusicCommentGetPayload
    >({
      query: (payload) => ({
        url: `musicComment/musicComments/${payload.currentSong}?page=${payload.currentPage}&limit=10`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      transformResponse: (res: {
        data: { musicComments: IMusicComment[]; totalCount: number };
      }) => {
        return res.data;
      },
    }),

    createNewMusicComment: builder.mutation<any, IMusicCommentBody>({
      query: (payload) => ({
        url: `musicComment/musicComment/${payload.originTo}`,
        method: "POST",
        body: {
          text: payload.text,
          timestamp: payload.timestamp,
        },
      }),
    }),

    toggleLikeMusicComment: builder.mutation<null, string>({
      query: (currentSong) => ({
        url: `musicComment/like/${currentSong}`,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetMusicListQuery,
  useGetMusicQuery,
  useCreateNewMusicCommentMutation,
  useGetMusicCommentsListQuery,
  useToggleLikeMusicCommentMutation,
} = musicApi;
