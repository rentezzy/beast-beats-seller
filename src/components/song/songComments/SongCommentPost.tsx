import { forwardRef } from "react";
import { useGetTimeAt, useGetTimeFromNow } from "../../../utils/utilhooks";
import { useGetUser, useCommentToggleLike } from "../../../store/hooks";

import styles from "../Song.module.css";
import { IMusicComment } from "../../../types/api.types";
import { SeekProps } from "../../../types/home.types";

interface IProps {
  comment: IMusicComment;
  seek: SeekProps;
}
const SongCommentPost = forwardRef<HTMLDivElement, IProps>(
  ({ comment, seek }, ref) => {
    const time = useGetTimeFromNow(comment.published);
    const at = useGetTimeAt(comment.timestamp ? comment.timestamp : 0);
    const { username, small } = useGetUser(comment.author);
    const { isLiked, onLikeHandler, likes } = useCommentToggleLike(comment);

    return (
      <div ref={ref} className={styles.song__comment__post}>
        <div className={styles.song__comment__image}>
          <img src={small} className="noselectText" alt="" draggable="false" />
        </div>
        <div className={styles.song__comment__info}>
          <div className={styles.song__comment__title}>
            <div className={styles.song__comment__subtitle}>
              <div className={styles.song__comment__subtitle__author}>
                {username}
              </div>
              <div
                className={styles.song__comment__subtitle__at + " noselectText"}
                onClick={() => seek.current.set(comment.timestamp!)}
              >
                {at}
              </div>
            </div>
            <div className={styles.song__comment__title__time}>{time}</div>
          </div>
          <div className={styles.song__comment__section}>
            <div className={styles.song__comment__text}>{comment.text}</div>
            <div className={styles.song__comment__like + " noselectText"}>
              {likes}
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
