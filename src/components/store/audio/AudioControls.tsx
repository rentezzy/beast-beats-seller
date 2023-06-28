import { Howl, Howler } from "howler";
import { useState, useEffect, MouseEvent } from "react";

import { useGetArtistsQuery } from "../../../store/slices/api/artistsApi";
import { useAppSelector } from "../../../store/hooks";

import styles from "../Store.module.css";
import back from "../../../assests/ui/player/back.png";
import forward from "../../../assests/ui/player/forward.png";
import pause from "../../../assests/ui/player/pause.png";
import play from "../../../assests/ui/player/play.png";
import speaker from "../../../assests/ui/player/speaker.png";
import noSpeaker from "../../../assests/ui/player/noSpeaker.png";

interface IPropsImage {
  image: string;
}
export const AudioImage: React.FC<IPropsImage> = ({ image }) => {
  return (
    <div className={styles.audio__image}>
      <img
        src={`${process.env.REACT_APP_MAIN_API}images/mus/default.png`}
        alt=""
      />
    </div>
  );
};
interface IPropsProgress {
  authorId: string;
  title: string;
  howl: Howl;
}
export const AudioProgress: React.FC<IPropsProgress> = (props) => {
  const { data } = useGetArtistsQuery(null);
  const [current, setCurrent] = useState(0);
  let author: string | undefined = "author";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(props.howl.seek());
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [props]);

  if (data) {
    author = data.find((arthist) => arthist._id === props.authorId)?.username;
  }
  const getTime = (time: number) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.round(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className={styles.audio__progress}>
      <div className={styles.audio__info}>
        {author} - {props.title}
      </div>
      <div className={styles.audio__bar}>
        <input
          type="range"
          min="0"
          max={`${props.howl.duration()}`}
          step="any"
          onChange={(e) => {
            setCurrent(+e.target.value);
            props.howl.seek(+e.target.value);
          }}
          value={current}
        />
        <div className={styles.audio__bar__info}>
          <div>{getTime(props.howl.seek())}</div>
          <div>{getTime(props.howl.duration())}</div>
        </div>
      </div>
    </div>
  );
};

interface IPropsButton {
  handler: (e: MouseEvent<HTMLDivElement>) => void;
}

export const AudioBackButton: React.FC<IPropsButton> = (props) => {
  return (
    <div className={styles.audio__button} onClick={props.handler}>
      <img src={back} alt="" />
    </div>
  );
};
export const AudioPlayButton: React.FC<IPropsButton> = (props) => {
  const isPlaying = useAppSelector((state) => state.musics.isPlaying);
  return (
    <div className={styles.audio__button} onClick={props.handler}>
      <img src={isPlaying ? pause : play} alt="" />
    </div>
  );
};
export const AudioNextButton: React.FC<IPropsButton> = (props) => {
  return (
    <div className={styles.audio__button} onClick={props.handler}>
      <img src={forward} alt="" />
    </div>
  );
};

export const AudioVolumeButton = () => {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  Howler.volume(volume);
  if (volume === 0 && muted === false) {
    setMuted(true);
  } else if (volume !== 0 && muted === true) setMuted(false);
  return (
    <div className={`${styles.audio__button} ${styles.audio__volume}`}>
      <img
        src={muted ? noSpeaker : speaker}
        onClick={() => setVolume((prev) => +!prev)}
        alt=""
      />
      <div className={styles.audio__volume__content}>
        <input
          type="range"
          min="0"
          max="1"
          step="any"
          onChange={(e) => {
            setVolume(+e.target.value);
          }}
          value={volume}
        />
      </div>
    </div>
  );
};
