import { forwardRef } from "react";
import styles from "../Song.module.css";
import { IMusicComment } from "../../../types/auth.types";
import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

interface IProps {
  comment: IMusicComment;
}
const SongCommentPost = forwardRef<HTMLDivElement, IProps>(
  ({ comment }, ref) => {
    dayjs.extend(relativeTime.default);
    console.log(dayjs(comment.published).fromNow());
    return (
      <div ref={ref} className={styles.song__comment__post}>
        {comment.text}
      </div>
    );
  }
);

export default SongCommentPost;
