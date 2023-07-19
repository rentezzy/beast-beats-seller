import { api } from "../api";
import {
  IArtist,
  IArtistPostGetResponse,
  IArtistPostGetPayload,
  ILoginUser,
  IArtistPostReplyToReplyGetPayload,
  IArtistPostReplyGetPayload,
  IArtistPostReplyGetResponse,
  IArtistPostReplyPostPayload,
} from "../../../types/api.types";

export const artistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query<ILoginUser[], any>({
      query: () => "user/artists",
      transformResponse: (res: { data: { users: ILoginUser[] } }) => {
        return res.data.users;
      },
    }),
    getArtistsFull: builder.query<IArtist[], any>({
      query: () => "artist",
      transformResponse: (res: { data: { artists: IArtist[] } }) => {
        return res.data.artists;
      },
    }),
    getArtistFull: builder.query<IArtist, string>({
      query: (id) => `artist/${id}`,
      transformResponse: (res: { data: { artist: IArtist } }) => {
        return res.data.artist;
      },
    }),
    getArtistPosts: builder.query<
      IArtistPostGetResponse,
      IArtistPostGetPayload
    >({
      query: (payload) =>
        `artistPost/${payload.authorId}?page=${payload.currentPage}&limit=10`,
      transformResponse: (res: { data: IArtistPostGetResponse }) => {
        return res.data;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.authorId;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (
          arg.currentPage * 10 === currentCache.artistPosts.length ||
          currentCache.artistPosts.length === newItems.totalCount
        )
          return;
        currentCache.artistPosts.push(...newItems.artistPosts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.currentPage !== previousArg?.currentPage;
      },
      providesTags: ["ArtistPost"],
    }),
    getArtistPostsReply: builder.query<
      IArtistPostReplyGetResponse,
      IArtistPostReplyGetPayload
    >({
      query: (payload) =>
        `artistPost/reply/${payload.postId}?page=${payload.currentPage}&limit=8`,

      transformResponse: (res: { data: IArtistPostReplyGetResponse }) => {
        return res.data;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.postId;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (
          arg.currentPage * 8 === currentCache.artistPostsReplyes.length ||
          currentCache.artistPostsReplyes.length === newItems.totalCount
        )
          return;
        currentCache.artistPostsReplyes.push(...newItems.artistPostsReplyes);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.currentPage !== previousArg?.currentPage;
      },
      providesTags: ["ArtistPostReply"],
    }),
    getArtistPostsReplyToReply: builder.query<
      IArtistPostReplyGetResponse,
      IArtistPostReplyToReplyGetPayload
    >({
      query: (payload) =>
        `artistPost/reply/reply/${payload.replyId}?page=${payload.currentPage}&limit=8`,
      transformResponse: (res: { data: IArtistPostReplyGetResponse }) => {
        return res.data;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.replyId;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (
          arg.currentPage * 8 === currentCache.artistPostsReplyes.length ||
          currentCache.artistPostsReplyes.length === newItems.totalCount
        )
          return;
        currentCache.artistPostsReplyes.push(...newItems.artistPostsReplyes);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.currentPage !== previousArg?.currentPage;
      },
      providesTags: ["ArtistPostReplyToReply"],
    }),
    createArtistPosts: builder.mutation({
      query: (text: string) => ({
        url: "artistPost",
        method: "POST",
        body: {
          text,
        },
      }),
    }),
    createArtistPostsReply: builder.mutation<any, IArtistPostReplyPostPayload>({
      query: (payload) => ({
        url: `artistPost/reply/${payload.postId}`,
        method: "POST",
        body: {
          text: payload.text,
          replyTo: payload.replyTo,
        },
      }),
    }),
    toggleArtistPostLike: builder.mutation<
      void,
      { postId: string; userId: string }
    >({
      query: (payload) => ({
        url: `artistPost/like/${payload.postId}`,
        method: "POST",
      }),
      onQueryStarted(
        { postId, userId },
        { dispatch, queryFulfilled, getState }
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of artistsApi.util.selectInvalidatedBy(getState(), [
          { type: "ArtistPost" },
        ])) {
          if (endpointName !== "getArtistPosts") continue;
          const patchResult = dispatch(
            artistsApi.util.updateQueryData(
              "getArtistPosts",
              originalArgs,
              (draft) => {
                const post = draft.artistPosts.find(
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
      invalidatesTags: ["ArtistPost"],
    }),
    toggleArtistPostReplyLike: builder.mutation<
      void,
      { postId: string; userId: string }
    >({
      query: (payload) => ({
        url: `artistPost/reply/like/${payload.postId}`,
        method: "POST",
      }),
      onQueryStarted(
        { postId, userId },
        { dispatch, queryFulfilled, getState }
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of artistsApi.util.selectInvalidatedBy(getState(), [
          { type: "ArtistPostReply" },
        ])) {
          if (endpointName !== "getArtistPostsReply") continue;
          const patchResult = dispatch(
            artistsApi.util.updateQueryData(
              "getArtistPostsReply",
              originalArgs,
              (draft) => {
                const post = draft.artistPostsReplyes.find(
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
      invalidatesTags: ["ArtistPostReply"],
    }),
    toggleArtistPostReplyToReplyLike: builder.mutation<
      void,
      { postId: string; userId: string }
    >({
      query: (payload) => ({
        url: `artistPost/reply/like/${payload.postId}`,
        method: "POST",
      }),
      onQueryStarted(
        { postId, userId },
        { dispatch, queryFulfilled, getState }
      ) {
        for (const {
          endpointName,
          originalArgs,
        } of artistsApi.util.selectInvalidatedBy(getState(), [
          { type: "ArtistPostReplyToReply" },
        ])) {
          if (endpointName !== "getArtistPostsReplyToReply") continue;
          const patchResult = dispatch(
            artistsApi.util.updateQueryData(
              "getArtistPostsReplyToReply",
              originalArgs,
              (draft) => {
                const post = draft.artistPostsReplyes.find(
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
      invalidatesTags: ["ArtistPostReplyToReply"],
    }),
  }),
});
export const {
  useGetArtistsQuery,
  useGetArtistFullQuery,
  useGetArtistsFullQuery,
  useLazyGetArtistPostsQuery,
  useLazyGetArtistPostsReplyQuery,
  useLazyGetArtistPostsReplyToReplyQuery,
  useCreateArtistPostsMutation,
  useCreateArtistPostsReplyMutation,
  useToggleArtistPostLikeMutation,
  useToggleArtistPostReplyLikeMutation,
  useToggleArtistPostReplyToReplyLikeMutation,
} = artistsApi;
