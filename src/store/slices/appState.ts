import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
  isLogined: false,
};

const appSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    appLogIn: (state) => {
      state.isLogined = true;
    },
    appLogOut: (state) => {
      state.isLogined = false;
    },
  },
  extraReducers: (builder) => ({
    autoLogin: builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, action) => {
        state.isLogined = true;
      }
    ),
    login: builder.addMatcher(
      authApi.endpoints.postLogin.matchFulfilled,
      (state, actions) => {
        state.isLogined = true;
      }
    ),
    logout: builder.addMatcher(
      authApi.endpoints.logOut.matchFulfilled,
      (state, action) => {
        state.isLogined = false;
      }
    ),
  }),
});

export const { actions, reducer } = appSlice;
