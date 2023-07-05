import { forwardRef } from "react";

import styles from "../Song.module.css";
import { IMusicComment } from "../../../types/auth.types";
import { useGetTimeAt, useGetTimeFromNow } from "../../../utils/utilhooks";
import {
  useGetUserAvatar,
  useGetUsername,
  useCommentLike,
} from "../../../store/hooks";

interface IProps {
  comment: IMusicComment;
}
const SongCommentPost = forwardRef<HTMLDivElement, IProps>(
  ({ comment }, ref) => {
    const time = useGetTimeFromNow(comment.published);
    const avatar = useGetUserAvatar(comment.author);
    const username = useGetUsername(comment.author);
    const at = useGetTimeAt(comment.timestamp ? comment.timestamp : 0);
    const { isLiked, onLikeHandler } = useCommentLike(comment._id);

    return (
      <div ref={ref} className={styles.song__comment__post}>
        <div className={styles.song__comment__image}>
          <img src={avatar} className="noselectText" alt="" draggable="false" />
        </div>
        <div className={styles.song__comment__info}>
          <div className={styles.song__comment__title}>
            <div className={styles.song__comment__subtitle}>
              <div className={styles.song__comment__subtitle__author}>
                {username}
              </div>
              <div className={styles.song__comment__subtitle__at}>{at}</div>
            </div>
            <div className={styles.song__comment__title__time}>{time}</div>
          </div>
          <div className={styles.song__comment__section}>
            <div className={styles.song__comment__text}>{comment.text}</div>
            <div className={styles.song__comment__like + " noselectText"}>
              <div
                onClick={onLikeHandler()}
                className={isLiked ? styles.song__comment__like_liked : ""}
              >
                ♡
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SongCommentPost;
