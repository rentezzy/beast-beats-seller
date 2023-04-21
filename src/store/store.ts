import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer as productReducer } from "./slices/productStoreSlice";

export const store = configureStore({
  reducer: {
    productStore: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
