import { Howl } from "howler";
import { useEffect, useRef } from "react";

import { useActions, useAppSelector } from "../../../store/hooks";

import styles from "../Store.module.css";

import {
  AudioBackButton,
  AudioImage,
  AudioNextButton,
  AudioPlayButton,
  AudioProgress,
  AudioVolumeButton,
} from "./AudioControls";

const Audio = () => {
  const currentTrack = useAppSelector((state) => state.musics.currentTrack);
  const isPlaying = useAppSelector((state) => state.musics.isPlaying);
  const { previousTrack, nextTrack, playMusic, pauseMusic } = useActions();

  let howl = useRef<Howl | undefined>(undefined);
  useEffect(() => {
    if (!currentTrack) return;
    const audio = new Howl({
      src: [`${process.env.REACT_APP_MAIN_API}music/music/${currentTrack._id}`],
      html5: true,
      format: ["mp3"],
    });
    audio.play();
    howl.current = audio;

    return () => {
      audio.stop();
      howl.current = undefined;
    };
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  if (isPlaying && !howl.current?.playing()) {
    howl.current?.play();
  } else if (!isPlaying && howl.current?.playing()) {
    howl.current.pause();
  }

  const prevTrackHandler = () => {
    if (!howl.current) return;
    if (howl.current.seek() < 5) {
      previousTrack();
    } else {
      howl.current.seek(0);
    }
  };
  const nextTrackHandler = () => {
    nextTrack();
  };
  const playHandler = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <div className={styles.audio}>
      <div className="container">
        <div className={styles.audio__panel}>
          <AudioImage image="" />
          <AudioProgress
            authorId={currentTrack.authorId}
            title={currentTrack.title}
          />
          <div className={styles.audio__buttons}>
            <AudioBackButton handler={prevTrackHandler} />
            <AudioPlayButton handler={playHandler} />
            <AudioNextButton handler={nextTrackHandler} />
            <AudioVolumeButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audio;
