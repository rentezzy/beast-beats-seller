import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    toggleLike: (state, action: PayloadAction<[string, string]>) => {
      const post = state.posts.reduce((acc, post) => {
        if (action.payload[0] === post._id) return post;
        return acc;
      });

      if (post.liked.includes(action.payload[1])) {
        post.liked.splice(post.liked.indexOf(action.payload[1]), 1);
      } else {
        post.liked.push(action.payload[1]);
      }
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
