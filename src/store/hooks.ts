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
import { IArtistPost } from "../types/auth.types";

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

export const useGetMyAvatar = () => {
  const { data } = useGetMeQuery(null);
  let small = `${process.env.REACT_APP_MAIN_API}images/img/default.png`;
  let big = `${process.env.REACT_APP_MAIN_API}images/img/default.png`;

  if (data && data.avatar !== "/default") {
    small = `${process.env.REACT_APP_MAIN_API}images/img/${data._id}/${data.avatar}-small.png`;
    big = `${process.env.REACT_APP_MAIN_API}images/img/${data._id}/${data.avatar}-big.png`;
  }
  return { small, big };
};

export const useGetUsername = (userId: string) => {
  const { data } = useGetUserQuery(userId);
  const [username, setUsername] = useState("user");
  if (data && data.username !== username) {
    setUsername(data.username);
  }
  return username;
};

export const useGetUserAvatar = (userId: string) => {
  const { data } = useGetUserQuery(userId);
  const [avatar, setAvatar] = useState("/default");
  if (data && data.avatar !== avatar) {
    setAvatar(data.avatar);
  }

  return avatar === "/default"
    ? `${process.env.REACT_APP_MAIN_API}images/img/default.png`
    : `${process.env.REACT_APP_MAIN_API}images/img/${data?._id}/${avatar}-small.png`;
};

export const useGetArtistInfo = (artistId: string) => {
  const { data } = useGetArtistFullQuery(artistId);
  const [about, setAbout] = useState("About me.");

  const [bigImg, setBigImg] = useState("/defaultBig.jpg");
  const [posterImg, setPosterImg] = useState("/defaultPoster.jpg");
  if (data && data.about !== about) {
    setAbout(data.about);
  }
  if (data && data.avatar.big !== bigImg) {
    setBigImg(data.avatar.big);
  }
  if (data && data.avatar.poster !== posterImg) {
    setPosterImg(data.avatar.poster);
  }

  const big = `${process.env.REACT_APP_MAIN_API}images/artists/big/${bigImg}`;
  const poster = `${process.env.REACT_APP_MAIN_API}images/artists/poster/${posterImg}`;
  return { about, big, poster };
};
export const useCommentLike = (commentId: string) => {
  const { data } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const comments = useAppSelector((state) => state.musicComments.musicComments);
  const [isLiked, setIsLiked] = useState(
    comments
      .find((comment) => comment._id === commentId)!
      .liked.includes(data!._id)
  );
  const { toggleMusicCommentLike } = useActions();
  const [toggleLikeQuery] = useToggleLikeMusicCommentMutation();
  const navigate = useNavigate();
  const onLikeHandler = () => {
    const toggleLike = () => {
      toggleLikeQuery(commentId);
      toggleMusicCommentLike([commentId, data!._id]);
      setIsLiked((prev) => !prev);
    };
    return isLogined ? () => toggleLike() : () => navigate("/signup");
  };
  const likes = comments.find((comment) => comment._id === commentId)!.liked
    .length;
  return { isLiked, onLikeHandler, likes };
};

export const useRedirectToStore = (artistId: string) => {
  const filters = useAppSelector((state) => state.musics.filters);
  const navigate = useNavigate();
  const { newFilters } = useActions();
  return () => {
    newFilters({ ...filters, author: artistId });
    navigate("/store");
  };
};

export const useArtistPostToggleLike = (post: IArtistPost) => {
  const { data } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [isLiked, setIsLiked] = useState(post.liked.includes(data!._id));
  const [toggleLikeQuery] = useToggleArtistPostLikeMutation();
  const navigate = useNavigate();
  const onLikeHandler = () => {
    const toggleLike = () => {
      toggleLikeQuery({
        postId: post._id,
        userId: data!._id,
      });
      setIsLiked((prev) => !prev);
    };
    return isLogined ? () => toggleLike() : () => navigate("/signup");
  };
  const likes = post.liked.length;
  return { isLiked, likes, onLikeHandler };
};

export const useArtistPostReplyToggleLike = (post: IArtistPost) => {
  const { data } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [isLiked, setIsLiked] = useState(post.liked.includes(data!._id));
  const [toggleLikeQuery] = useToggleArtistPostReplyLikeMutation();
  const navigate = useNavigate();
  const onLikeHandler = () => {
    const toggleLike = () => {
      toggleLikeQuery({
        postId: post._id,
        userId: data!._id,
      });
      setIsLiked((prev) => !prev);
    };
    return isLogined ? () => toggleLike() : () => navigate("/signup");
  };
  const likes = post.liked.length;
  return { isLiked, likes, onLikeHandler };
};
export const useArtistPostReplyToReplyToggleLike = (post: IArtistPost) => {
  const { data } = useGetMeQuery(null);
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [isLiked, setIsLiked] = useState(post.liked.includes(data!._id));
  const [toggleLikeQuery] = useToggleArtistPostReplyToReplyLikeMutation();
  const navigate = useNavigate();
  const onLikeHandler = () => {
    const toggleLike = () => {
      toggleLikeQuery({
        postId: post._id,
        userId: data!._id,
      });
      setIsLiked((prev) => !prev);
    };
    return isLogined ? () => toggleLike() : () => navigate("/signup");
  };
  const likes = post.liked.length;
  return { isLiked, likes, onLikeHandler };
};

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
