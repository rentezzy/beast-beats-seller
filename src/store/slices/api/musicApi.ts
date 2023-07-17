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
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.currentSong;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (
          arg.currentPage * 10 === currentCache.musicComments.length ||
          currentCache.musicComments.length === newItems.totalCount
        )
          return;
        currentCache.musicComments.push(...newItems.musicComments);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.currentPage !== previousArg?.currentPage;
      },
      providesTags: ["MusicComment"],
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

    toggleLikeMusicComment: builder.mutation<
      null,
      { postId: string; userId: string }
    >({
      query: (payload) => ({
        url: `musicComment/like/${payload.postId}`,
        method: "POST",
      }),
      onQueryStarted(
        { postId, userId },
        { dispatch, queryFulfilled, getState }
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of musicApi.util.selectInvalidatedBy(getState(), [
          { type: "MusicComment" },
        ])) {
          if (endpointName !== "getMusicCommentsList") continue;
          const patchResult = dispatch(
            musicApi.util.updateQueryData(
              "getMusicCommentsList",
              originalArgs,
              (draft) => {
                const post = draft.musicComments.find(
                  (post) => post._id === postId
                );
                if (!post) return;
                const liked = post.liked.includes(userId);
                if (liked) {
                  post.liked.splice(post.liked.indexOf(userId), 1);
                } else {
                  post.liked.push(userId);
                }
              }
            )
          );
          queryFulfilled.catch(patchResult.undo);
        }
      },
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
