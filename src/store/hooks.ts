import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useMemo, useState, useEffect } from "react";

import { useGetMeQuery } from "./slices/api/authApi";
import { useGetAppInfoQuery } from "./slices/api/appApi";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useToggleCartMutation } from "./slices/api/userApi";
import { actions as productActions } from "./slices/faq";
import { actions as appActions } from "./slices/appState";
import { actions as newsPostsActions } from "./slices/newsPosts";
import { actions as musicActions } from "./slices/music";
import { actions as musicCommentActions } from "./slices/musicComment";

import type { RootState, AppDispatch } from "./store";
import { useToggleLikeMusicCommentMutation } from "./slices/api/musicApi";
import {
  useGetArtistFullQuery,
  useLazyGetArtistPostsQuery,
  useLazyGetArtistPostsReplyQuery,
  useLazyGetArtistPostsReplyToReplyQuery,
  useToggleArtistPostLikeMutation,
  useToggleArtistPostReplyLikeMutation,
  useToggleArtistPostReplyToReplyLikeMutation,
} from "./slices/api/artistsApi";
import { IArtistPost, IMusicComment, INewsPost } from "../types/api.types";
import { defaultArtist, defaultUser } from "../utils/functions";
import { useToggleLikeNewsPostMutation } from "./slices/api/newsApi";

const rootActions = {
  ...productActions,
  ...appActions,
  ...newsPostsActions,
  ...musicActions,
  ...musicCommentActions,
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
// USERS
export const useGetMe = () => {
  const { data } = useGetMeQuery(null);
  return defaultUser(data);
};

export const useGetUser = (userId: string) => {
  const { data } = useGetUserQuery(userId);
  return defaultUser(data);
};

export const useGetArtist = (artistId: string) => {
  const { data } = useGetArtistFullQuery(artistId);
  return defaultArtist(data);
};

//REDIRECT

export const useRedirectToStore = (artistId: string) => {
  const filters = useAppSelector((state) => state.musics.filters);
  const navigate = useNavigate();
  const { newFilters } = useActions();
  return () => {
    newFilters({ ...filters, author: artistId });
    navigate("/store");
  };
};

// CART

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

//LIKES

export const useCommentToggleLike = (comment: IMusicComment) => {
  const [toggleLikeQuery] = useToggleLikeMusicCommentMutation();
  return useToggleLike(
    { _id: comment._id, liked: comment.liked },
    toggleLikeQuery
  );
};

export const useArtistPostToggleLike = (post: IArtistPost) => {
  const [toggleLikeQuery] = useToggleArtistPostLikeMutation();
  return useToggleLike({ _id: post._id, liked: post.liked }, toggleLikeQuery);
};

export const useArtistPostReplyToggleLike = (post: IArtistPost) => {
  const [toggleLikeQuery] = useToggleArtistPostReplyLikeMutation();
  return useToggleLike({ _id: post._id, liked: post.liked }, toggleLikeQuery);
};
export const useArtistPostReplyToReplyToggleLike = (post: IArtistPost) => {
  const [toggleLikeQuery] = useToggleArtistPostReplyToReplyLikeMutation();
  return useToggleLike({ _id: post._id, liked: post.liked }, toggleLikeQuery);
};
export const useNewsToggleLike = (post: INewsPost) => {
  const { data } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [isLiked, setIsLiked] = useState(false);
  const [toggleLikeQuery] = useToggleLikeNewsPostMutation();
  const navigate = useNavigate();
  const { toggleLike } = useActions();
  if (isLogined && data && isLiked !== post.liked.includes(data._id)) {
    setIsLiked(post.liked.includes(data._id));
  }
  const onLikeHandler = () => {
    const toggleLikeHandler = () => {
      toggleLikeQuery(post._id);
      toggleLike([post._id, data!._id]);
      setIsLiked((prev) => !prev);
    };
    return isLogined ? () => toggleLikeHandler() : () => navigate("/signup");
  };
  const likes = post.liked.length;
  return { isLiked, likes, onLikeHandler };
};
const useToggleLike = (
  post: Pick<IArtistPost, "_id" | "liked">,
  toggleLikeQuery: (payload: { postId: string; userId: string }) => void
) => {
  const { data } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  if (isLogined && data && isLiked !== post.liked.includes(data._id)) {
    setIsLiked(post.liked.includes(data._id));
  }
  const onLikeHandler = () => {
    const toggleLike = () => {
      toggleLikeQuery({ postId: post._id, userId: data!._id });
      setIsLiked((prev) => !prev);
    };
    return isLogined ? () => toggleLike() : () => navigate("/signup");
  };
  const likes = post.liked.length;
  return { isLiked, likes, onLikeHandler };
};

//PAGINATIONS

export const useArtistsPostPagination = (artistId: string) => {
  const [page, setPage] = useState(1);
  const [getPosts, data] = useLazyGetArtistPostsQuery();

  let posts;
  const isAll =
    data.data && data.data.artistPosts.length === data.data.totalCount;
  const isFetching = data.isFetching;
  useEffect(() => {
    if (isAll) return;
    getPosts({ authorId: artistId, currentPage: page }, true);
  }, [page, getPosts, artistId, isAll]);

  if (data.data?.artistPosts) posts = data.data.artistPosts;
  const nextPage = () => setPage((page) => page + 1);
  return { posts, isAll, isFetching, nextPage };
};

export const useArtistsPostReplyesPagination = (
  postId: string,
  replyes: number
) => {
  const [page, setPage] = useState(1);
  const [getPosts, data] = useLazyGetArtistPostsReplyQuery();

  let posts;
  const isAll =
    data.data && data.data.artistPostsReplyes.length === data.data.totalCount;
  const isFetching = data.isFetching;
  useEffect(() => {
    if (isAll && !replyes) return;
    getPosts({ postId, currentPage: page }, true);
  }, [page, getPosts, postId, isAll, replyes]);

  if (data.data?.artistPostsReplyes) posts = data.data.artistPostsReplyes;
  const nextPage = () => setPage((page) => page + 1);
  return { posts, isAll, isFetching, nextPage };
};

export const useArtistsPostReplyToReplyPagination = (
  postId: string,
  replyes: number
) => {
  const [page, setPage] = useState(1);
  const [getPosts, data] = useLazyGetArtistPostsReplyToReplyQuery();

  let posts;
  const isAll =
    data.data && data.data.artistPostsReplyes.length === data.data.totalCount;
  const isFetching = data.isFetching;
  useEffect(() => {
    if (isAll && !replyes) return;
    getPosts({ replyId: postId, currentPage: page }, true);
  }, [page, getPosts, postId, isAll, replyes]);

  if (data.data?.artistPostsReplyes) posts = data.data.artistPostsReplyes;
  const nextPage = () => setPage((page) => page + 1);
  return { posts, isAll, isFetching, nextPage };
};
