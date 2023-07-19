import { forwardRef } from "react";

import { useNewsToggleLike } from "../../../store/hooks";
import { useGetTimePublished } from "../../../utils/utilhooks";

import styles from "../Home.module.css";
import { INewsPost } from "../../../types/api.types";

const NewsPost = forwardRef<HTMLDivElement, { post: INewsPost }>(
  ({ post }, ref) => {
    const { isLiked, likes, onLikeHandler } = useNewsToggleLike(post);

    const date = useGetTimePublished(post.published);

    const likeClassName = isLiked ? styles.newsPost__like_liked : "";

    return (
      <div ref={ref} className={styles.newsPost}>
        <div className={styles.newsPost__title}>{post.title}</div>
        <div className={styles.newsPost__text}>{post.text}</div>
        <div className={styles.newsPost__footer}>
          <div className={styles.newsPost__info}>
            <div className={styles.newsPost__author}>
              Author: {post.authorUsername}
            </div>
            <div className={styles.newsPost__date}>{date}</div>
          </div>
          <div className={styles.newsPost__likeInfo}>
            <div className={styles.newsPost__likes}>{likes}</div>
            <div
              className={`${styles.newsPost__like} ${likeClassName} noselectText`}
              onClick={onLikeHandler()}
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
