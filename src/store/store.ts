import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as productReducer } from "./slices/productStore";
import { reducer as appReducer } from "./slices/appState";
import { api } from "./slices/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    productStore: productReducer,
    appState: appReducer,
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
