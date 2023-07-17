import { IAppInfo } from "../../../types/api.types";
import { api } from "../api";

export const appApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppInfo: builder.query<IAppInfo, any>({
      query: () => "app/appInfo",
      transformResponse: (res: { data: { app: IAppInfo } }) => {
        return res.data.app;
      },
      providesTags: ["App"],
    }),
  }),
});
export const { useGetAppInfoQuery } = appApi;
