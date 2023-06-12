import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions as productActions } from "./slices/productStore";
import { actions as appActions } from "./slices/appState";
import { useGetMeQuery } from "./slices/api/authApi";

const rootActions = { ...productActions, ...appActions };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
export const useAppInitialize = () => {
  const loads = [useGetMeQuery(null).isLoading];
  return new Promise((resolve, reject) => {
    if (loads.filter((value) => value === true).length === 0) {
      resolve(true);
    }
  });
};
