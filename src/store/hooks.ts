import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions as productActions } from "./slices/productStore";
import { actions as appActions } from "./slices/appState";

const rootActions = { ...productActions, ...appActions };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
