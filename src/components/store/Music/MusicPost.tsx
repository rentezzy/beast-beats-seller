import { forwardRef } from "react";

import { useGetArtistsQuery } from "../../../store/slices/api/artistsApi";
import { useActions, useAppSelector } from "../../../store/hooks";

import styles from "../Store.module.css";
import cart from "../../../assests/cart.jpg";
import play from "../../../assests/ui/player/play.png";
import pause from "../../../assests/ui/player/pause.png";
import { IMusicInfo } from "../../../types/auth.types";

interface IProps {
  music: IMusicInfo;
}

const MusicPost = forwardRef<HTMLDivElement, IProps>(({ music }, ref) => {
  const isPlaying = useAppSelector((state) => state.musics.isPlaying);
  const currentTrack = useAppSelector((state) => state.musics.currentTrack);
  const { data } = useGetArtistsQuery(null);
  const { newTrack, pauseMusic, playMusic } = useActions();
  let author: string | undefined = "author";
  if (data) {
    author = data.find((arthist) => arthist._id === music.authorId)?.username;
  }
  const playTrackHandler = () => {
    if (currentTrack?._id === music._id && isPlaying) {
      pauseMusic();
    } else {
      newTrack(music);
      playMusic();
    }
  };
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
      <div
        className={`${styles.musicPost__button} ${styles.musicPost__play}`}
        onClick={playTrackHandler}
      >
        <img
          src={currentTrack?._id === music._id && isPlaying ? pause : play}
          alt=""
        />
      </div>
      <div className={`${styles.musicPost__button}`}>
        <img src={cart} alt="" />
      </div>
    </div>
  );
});

export default MusicPost;
