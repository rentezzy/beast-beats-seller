import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMusicComment } from "../../types/api.types";
import { musicApi } from "./api/musicApi";

interface IState {
  currentSong: string;
  musicComments: Array<IMusicComment>;
  totalCount: number;
  currentPage: number;
}

const initialState: IState = {
  musicComments: [],
  currentSong: "",
  totalCount: 0,
  currentPage: 1,
};

const musicCommentsSlice = createSlice({
  name: "musicComments",
  initialState,
  reducers: {
    nextPageMusicComments: (state) => {
      state.currentPage++;
    },
    newSong: (state, action: PayloadAction<string>) => {
      state.currentSong = action.payload;
      state.musicComments = [];
      state.totalCount = 0;
      state.currentPage = 1;
    },
    toggleMusicCommentLike: (state, action: PayloadAction<[string, string]>) => {
      const comment = state.musicComments.find((post) => {
        return action.payload[0] === post._id;
      });
      if (!comment) return;

      if (comment.liked.includes(action.payload[1])) {
        comment.liked.splice(comment.liked.indexOf(action.payload[1]), 1);
      } else {
        comment.liked.push(action.payload[1]);
      }
    },
  },
  extraReducers: (builder) => ({
    addNewMusicComments: builder.addMatcher(
      musicApi.endpoints.getMusicCommentsList.matchFulfilled,
      (state, action) => {
        if (
          state.musicComments.length === 0 ||
          state.totalCount !== state.musicComments.length
        )
          state.musicComments.push(...action.payload.musicComments);
        state.totalCount = action.payload.totalCount;
      }
    ),
  }),
});

export const { actions, reducer } = musicCommentsSlice;
