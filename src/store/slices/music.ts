import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMusicInfo, IMusicInfoBody } from "../../types/auth.types";
import { musicApi } from "./api/musicApi";
import { appApi } from "./api/appApi";

interface IState {
  musics: Array<IMusicInfo>;
  filters: Omit<IMusicInfoBody, "currentPage">;
  totalCount: number;
  currentPage: number;
  currentTrack: IMusicInfo | undefined;
  isPlaying: boolean;
}

const initialState: IState = {
  musics: [],
  filters: { author: "all", genre: "all", priceFrom: 0, priceTo: 9999999 },
  totalCount: 0,
  currentPage: 1,
  currentTrack: undefined,
  isPlaying: false,
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
      state.currentTrack = undefined;
      state.isPlaying = false;
    },
    newTrack: (state, action: PayloadAction<IMusicInfo>) => {
      state.currentTrack = action.payload;
    },
    nextTrack: (state) => {
      const index = state.musics.findIndex(
        (music) => music._id === state.currentTrack?._id
      );
      if (index === -1 || index + 1 === state.musics.length) return;
      state.currentTrack = state.musics[index + 1];
    },
    previousTrack: (state) => {
      const index = state.musics.findIndex(
        (music) => music._id === state.currentTrack?._id
      );
      if (index - 1 <= -1) return;
      state.currentTrack = state.musics[index - 1];
    },
    pauseMusic: (state) => {
      state.isPlaying = false;
    },
    playMusic: (state) => {
      state.isPlaying = true;
    },
  },
  extraReducers: (builder) => ({
    addNewMusics: builder.addMatcher(
      musicApi.endpoints.getMusicList.matchFulfilled,
      (state, action) => {
        if (
          state.musics.length === 0 ||
          state.totalCount !== state.musics.length
        )
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
