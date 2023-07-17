import { forwardRef } from "react";

import { useGetMeQuery } from "../../../store/slices/api/authApi";
import { useActions } from "../../../store/hooks";
import { useToggleLikeNewsPostMutation } from "../../../store/slices/api/newsApi";

import styles from "../Home.module.css";
import { INewsPost } from "../../../types/api.types";

const NewsPost = forwardRef<HTMLDivElement, { post: INewsPost }>(
  (props, ref) => {
    const { data } = useGetMeQuery(null);
    const [toggleLikeQuery] = useToggleLikeNewsPostMutation();
    const { toggleLike } = useActions();

    const date = new Date(props.post.published);
    const dateString = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}`;

    const onLikeHandler = () => {
      if (data) {
        toggleLikeQuery(props.post._id);
        toggleLike([props.post._id, data?._id]);
      }
    };

    const likeClassName =
      data && props.post.liked.includes(data._id)
        ? styles.newsPost__like_liked
        : "";

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
            <div
              className={`${styles.newsPost__like} ${likeClassName} noselectText`}
              onClick={onLikeHandler}
            >
              ♡
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default NewsPost;
