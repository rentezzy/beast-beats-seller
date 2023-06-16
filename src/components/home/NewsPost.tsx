import { forwardRef } from "react";

import { useGetMeQuery } from "../../store/slices/api/authApi";
import { useAppSelector } from "../../store/hooks";

import styles from "./Home.module.css";
import { INewsPost } from "../../types/auth.types";

const NewsPost = forwardRef<HTMLDivElement, { post: INewsPost }>(
  (props, ref) => {
    const isLogined = useAppSelector((state) => state.appState.isLogined);
    const { data } = useGetMeQuery(null);

    let isLiked = "";
    if (isLogined && data) {
      isLiked = props.post.liked.includes(data._id)
        ? styles.newsPost__like_liked
        : "";
    }

    const date = new Date(props.post.published);
    const dateString = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}`;

    return (
      <div ref={ref} className={styles.newsPost}>
        <div className={styles.newsPost__title}>{props.post.title}</div>
        <div className={styles.newsPost__text}>{props.post.text}</div>
        <div className={styles.newsPost__footer}>
          <div className={styles.newsPost__info}>
            <div className={styles.newsPost__author}>
              Author: {props.post.authorUsername}
            </div>
            <div className={styles.newsPost__date}>{dateString}</div>
          </div>
          <div className={styles.newsPost__likeInfo}>
            <div className={styles.newsPost__likes}>
              {props.post.liked.length}
            </div>
            <div className={`${styles.newsPost__like} ${isLiked} noselectText`}>♡</div>
          </div>
        </div>
      </div>
    );
  }
);

export default NewsPost;
