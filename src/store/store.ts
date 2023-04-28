import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as productReducer } from "./slices/productStore";
import { reducer as appReducer } from "./slices/appState";
import { authApi } from "./slices/authApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    productStore: productReducer,
    appState: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
