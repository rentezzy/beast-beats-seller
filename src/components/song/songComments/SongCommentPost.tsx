import { forwardRef } from "react";
import styles from "../Song.module.css";
import { IMusicComment } from "../../../types/auth.types";
interface IProps {
  comment: IMusicComment;
}
const SongCommentPost = forwardRef<HTMLDivElement, IProps>(
  ({ comment }, ref) => {
    return (
      <div ref={ref} className={styles.song__comment__post}>
        {comment.text}
      </div>
    );
  }
);

export default SongCommentPost;
