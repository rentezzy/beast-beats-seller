import { forwardRef } from "react";

import styles from "../Store.module.css";
import { IMusicInfo } from "../../../types/auth.types";
import { useGetArtistsQuery } from "../../../store/slices/api/artistsApi";
import cartImg from "../../../assests/cart.jpg";
import playImg from "../../../assests/ui/player/play.png";
import pauseImg from "../../../assests/ui/player/pause.png";

interface IProps {
  music: IMusicInfo;
}

const MusicPost = forwardRef<HTMLDivElement, IProps>(({ music }, ref) => {
  const { data } = useGetArtistsQuery(null);
  let author: string | undefined = "author";
  if (data) {
    author = data.find((arthist) => arthist._id === music.authorId)?.username;
  }
  return (
    <div ref={ref} className={styles.musicPost}>
      <div className={styles.musicPost__image}>
        <img
          src={`${process.env.REACT_APP_MAIN_API}images/mus/default.png`}
          alt=""
        />
      </div>
      <div className={styles.musicPost__info}>
        {author} - {music.title}
      </div>
      <div className={styles.musicPost__price}>
        {music.price === 0 ? "Free" : `${music.price}$`}
      </div>
      <div className={`${styles.musicPost__button} ${styles.musicPost__play}`}>
        <img src={playImg} />
      </div>
      <div className={`${styles.musicPost__button}`}>
        <img src={cartImg} />
      </div>
    </div>
  );
});

export default MusicPost;
