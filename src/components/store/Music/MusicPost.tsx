import { forwardRef } from "react";

import styles from "../Store.module.css";
import { IMusicInfo } from "../../../types/auth.types";

interface IProps {
  music: IMusicInfo;
}

const MusicPost = forwardRef<HTMLDivElement, IProps>(({ music }, ref) => {
  return (
    <div ref={ref} className={styles.musicPost}>
      {music.title}
    </div>
  );
});

export default MusicPost;
