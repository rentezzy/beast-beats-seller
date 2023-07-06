import { api } from "../api";
import { IArtist, ILoginUser } from "../../../types/auth.types";

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
  }),
});
export const {
  useGetArtistsQuery,
  useGetArtistFullQuery,
  useLazyGetArtistFullQuery,
} = artistsApi;
