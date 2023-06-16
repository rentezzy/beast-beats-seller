import { forwardRef } from "react";

import styles from "./Home.module.css";
import { INewsPost } from "../../types/auth.types";

const NewsPost = forwardRef<HTMLDivElement, { post: INewsPost }>(
  (props, ref) => {
    return (
      <div ref={ref} className={styles.newsPost}>
        {props.post.text}
      </div>
    );
  }
);

export default NewsPost;
