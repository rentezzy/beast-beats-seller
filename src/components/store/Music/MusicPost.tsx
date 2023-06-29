import { forwardRef } from "react";

import { useNavigate } from "react-router-dom";
import { useGetArtistsQuery } from "../../../store/slices/api/artistsApi";
import { useActions, useAppSelector } from "../../../store/hooks";
import { useToggleCartMutation } from "../../../store/slices/api/userApi";

import styles from "../Store.module.css";
import cart from "../../../assests/cart.jpg";
import noCart from "../../../assests/nocart.png";
import play from "../../../assests/ui/player/play.png";
import pause from "../../../assests/ui/player/pause.png";
import { IMusicInfo } from "../../../types/auth.types";

interface IProps {
  music: IMusicInfo;
  inCart?: boolean;
}

const MusicPost = forwardRef<HTMLDivElement, IProps>(
  ({ music, inCart }, ref) => {
    const isPlaying = useAppSelector((state) => state.musics.isPlaying);
    const isLogined = useAppSelector((state) => state.appState.isLogined);
    const navigate = useNavigate();
    const currentTrack = useAppSelector((state) => state.musics.currentTrack);
    const { data } = useGetArtistsQuery(null);
    const [toggleCart, cartData] = useToggleCartMutation();
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
    const cartHandler = () => {
      return isLogined
        ? () => (!cartData.isLoading ? toggleCart(music._id) : "")
        : () => navigate("/signup");
    };
    console.log(music.title);
    return (
      <div ref={ref} className={styles.musicPost}>
        <div className={styles.musicPost__image}>
          <img
            src={`${process.env.REACT_APP_MAIN_API}images/mus/${music.image}`}
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
        >
          <img
            src={currentTrack?._id === music._id && isPlaying ? pause : play}
            alt=""
            onClick={playTrackHandler}
          />
        </div>
        <div className={`${styles.musicPost__button}`}>
          <img src={inCart ? noCart : cart} alt="" onClick={cartHandler()} />
        </div>
      </div>
    );
  }
);

export default MusicPost;
