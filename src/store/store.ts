import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as productReducer } from "./slices/productStore";
import { reducer as appReducer } from "./slices/appState";
import { reducer as newsPostReducer } from "./slices/newsPosts";
import { api } from "./slices/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    productStore: productReducer,
    appState: appReducer,
    newsPosts: newsPostReducer,
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
