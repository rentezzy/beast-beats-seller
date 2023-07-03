import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useMemo, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actions as productActions } from "./slices/faq";
import { actions as appActions } from "./slices/appState";
import { actions as newsPostsActions } from "./slices/newsPosts";
import { actions as musicActions } from "./slices/music";
import { useGetMeQuery } from "./slices/api/authApi";
import { useGetAppInfoQuery } from "./slices/api/appApi";
import { useNavigate } from "react-router-dom";
import { useToggleCartMutation } from "./slices/api/userApi";

const rootActions = {
  ...productActions,
  ...appActions,
  ...newsPostsActions,
  ...musicActions,
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
export const useAppInitialize = () => {
  const loads = [
    useGetMeQuery(null).isLoading,
    useGetAppInfoQuery(null).isLoading,
  ];
  return new Promise((resolve, reject) => {
    if (loads.filter((value) => value === true).length === 0) {
      resolve(true);
    }
  });
};

export const useInCart = (songId: string) => {
  const { data } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [inCart, setInCart] = useState(data?.cart.includes(songId));
  const navigate = useNavigate();
  const [toggleCart] = useToggleCartMutation();
  const cartHandler = () => {
    const toggleHandler = () => {
      toggleCart(songId);
      setInCart((prev) => !prev);
    };
    return isLogined ? () => toggleHandler() : () => navigate("/signup");
  };
  return { inCart, cartHandler };
};
