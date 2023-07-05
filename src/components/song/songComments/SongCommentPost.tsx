import { forwardRef } from "react";

import styles from "../Song.module.css";
import { IMusicComment } from "../../../types/auth.types";
import { useGetTimeFromNow } from "../../../utils/utilhooks";
import { useGetUserAvatar, useGetUsername } from "../../../store/hooks";

interface IProps {
  comment: IMusicComment;
}
const SongCommentPost = forwardRef<HTMLDivElement, IProps>(
  ({ comment }, ref) => {
    const time = useGetTimeFromNow(comment.published);
    const avatar = useGetUserAvatar(comment.author);
    const username = useGetUsername(comment.author);

    return (
      <div ref={ref} className={styles.song__comment__post}>
        <div className={styles.song__comment__image}>
          <img src={avatar} alt="" />
        </div>
        <div className={styles.song__comment__info}>
          <div className={styles.song__comment__title}>
            <div className={styles.song__comment__subtitle}>
              <div className={styles.song__comment__subtitle__author}>
                {username},
              </div>
              <div className={styles.song__comment__subtitle__at}>
                at {comment.timestamp}
              </div>
            </div>
            <div className={styles.song__comment__title__time}>{time}</div>
          </div>
          <div className={styles.song__comment__section}>
            <div className={styles.song__comment__text}>{comment.text}</div>
            <div className={styles.song__comment__like}>♡</div>
          </div>
        </div>
      </div>
    );
  }
);

export default SongCommentPost;
