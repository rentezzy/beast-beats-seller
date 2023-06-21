import { api } from "../api";
import { ILoginUser } from "../../../types/auth.types";

export const artistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query<ILoginUser[], any>({
      query: () => "user/artists",
      transformResponse: (res: { data: { users: ILoginUser[] } }) => {
        return res.data.users;
      },
    }),
  }),
});
export const { useGetArtistsQuery } = artistsApi;
