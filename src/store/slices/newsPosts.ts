import { createSlice } from "@reduxjs/toolkit";
import { INewsPost } from "../../types/auth.types";
import { newsApi } from "./api/newsApi";

interface IState {
  posts: Array<INewsPost>;
  totalCount: number;
  currentPage: number;
}

const initialState: IState = {
  posts: [],
  totalCount: 0,
  currentPage: 1,
};

const newsPostsSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage++;
    },
  },
  extraReducers: (builder) => ({
    addNewPosts: builder.addMatcher(
      newsApi.endpoints.getNewsPosts.matchFulfilled,
      (state, action) => {
        state.posts.push(...action.payload.newsPosts);
        state.totalCount = action.payload.totalCount;
      }
    ),
  }),
});

export const { actions, reducer } = newsPostsSlice;
