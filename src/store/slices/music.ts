import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMusicInfo, IMusicInfoBody } from "../../types/auth.types";
import { musicApi } from "./api/musicApi";
import { appApi } from "./api/appApi";

interface IState {
  musics: Array<IMusicInfo>;
  filters: Omit<IMusicInfoBody, "currentPage">;
  totalCount: number;
  currentPage: number;
}

const initialState: IState = {
  musics: [],
  filters: { author: "all", genre: "all", priceFrom: 0, priceTo: 9999999 },
  totalCount: 0,
  currentPage: 1,
};

const musicsSlice = createSlice({
  name: "musicPosts",
  initialState,
  reducers: {
    nextPageMusic: (state) => {
      state.currentPage++;
    },
    newFilters: (
      state,
      action: PayloadAction<Omit<IMusicInfoBody, "currentPage">>
    ) => {
      state.musics = [];
      state.currentPage = 1;
      state.filters = action.payload;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => ({
    addNewMusics: builder.addMatcher(
      musicApi.endpoints.getMusicList.matchFulfilled,
      (state, action) => {
        state.musics.push(...action.payload.musics);
        state.totalCount = action.payload.totalCount;
      }
    ),
    addMaxPrice: builder.addMatcher(
      appApi.endpoints.getAppInfo.matchFulfilled,
      (state, action) => {
        state.filters.priceTo = action.payload.maxPrice;
      }
    ),
  }),
});

export const { actions, reducer } = musicsSlice;
