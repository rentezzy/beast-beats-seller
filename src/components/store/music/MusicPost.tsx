import { forwardRef } from "react";

import { useNavigate } from "react-router-dom";
import {
  useActions,
  useAppSelector,
  useGetUser,
  useInCart,
} from "../../../store/hooks";

import styles from "../Store.module.css";
import { IMusicInfo } from "../../../types/api.types";

import cart from "../../../assests/cart.jpg";
import checkmark from "../../../assests/checkmark.png";
import play from "../../../assests/ui/player/play.png";
import pause from "../../../assests/ui/player/pause.png";

interface IProps {
  music: IMusicInfo;
}

const MusicPost = forwardRef<HTMLDivElement, IProps>(({ music }, ref) => {
  const { newTrack, pauseMusic, playMusic } = useActions();
  const isPlaying = useAppSelector((state) => state.musics.isPlaying);
  const currentTrack = useAppSelector((state) => state.musics.currentTrack);

  const { inCart, cartHandler } = useInCart(music._id);
  const { username } = useGetUser(music.authorId);
  const navigate = useNavigate();

  const playTrackHandler = () => {
    if (currentTrack?._id === music._id && isPlaying) {
      pauseMusic();
    } else {
      newTrack(music);
      playMusic();
    }
  };
  const navigateHandler = () => navigate(`/song/${music._id}`);

  return (
    <div ref={ref} className={styles.musicPost}>
      <div className={styles.musicPost__image}>
        <img
          src={`${process.env.REACT_APP_MAIN_API}images/mus/${music.image}`}
          alt=""
          onClick={navigateHandler}
        />
      </div>
      <div className={styles.musicPost__info} onClick={navigateHandler}>
        {username} - {music.title}
      </div>
      <div className={styles.musicPost__price}>
        {music.price === 0 ? "Free" : `${music.price}$`}
      </div>
      <div className={`${styles.musicPost__button} ${styles.musicPost__play}`}>
        <img
          src={currentTrack?._id === music._id && isPlaying ? pause : play}
          alt=""
          onClick={playTrackHandler}
        />
      </div>
      <div className={`${styles.musicPost__button}`}>
        {inCart ? (
          <img src={checkmark} alt="" onClick={cartHandler()} />
        ) : (
          <img src={cart} alt="" onClick={cartHandler()} />
        )}
      </div>
    </div>
  );
});

export default MusicPost;
