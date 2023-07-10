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
} from "../../../types/auth.types";

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
  }),
});
export const {
  useGetArtistsQuery,
  useGetArtistFullQuery,
  useGetArtistsFullQuery,
  useGetArtistPostsQuery,
  useGetArtistPostsReplyQuery,
  useGetArtistPostsReplyToReplyQuery,
  useCreateArtistPostsMutation,
  useCreateArtistPostsReplyMutation,
} = artistsApi;
