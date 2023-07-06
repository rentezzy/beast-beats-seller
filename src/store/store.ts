import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as faqReducer } from "./slices/faq";
import { reducer as appReducer } from "./slices/appState";
import { reducer as newsPostReducer } from "./slices/newsPosts";
import { reducer as musicsReducer } from "./slices/music";
import { reducer as musicCommentsReducer } from "./slices/musicComment";
import { api } from "./slices/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    faq: faqReducer,
    appState: appReducer,
    newsPosts: newsPostReducer,
    musics: musicsReducer,
    musicComments: musicCommentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
