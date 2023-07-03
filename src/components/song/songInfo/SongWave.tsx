import { WaveSurfer, WaveForm } from "wavesurfer-react";

import { useCallback, useRef } from "react";

import styles from "../Song.module.css";
import SongControls from "./SongControls";

interface IProps {
  songId: string;
}
const SongWave: React.FC<IProps> = ({ songId }) => {
  const wavesurferRef = useRef<any>();

  const handleWSMount = useCallback(
    (waveSurfer: any) => {
      wavesurferRef.current = waveSurfer;

      wavesurferRef.current.load(
        `${process.env.REACT_APP_MAIN_API}audio/${songId}.mp3`
      );
      wavesurferRef.current.params.barWidth = 2;
      wavesurferRef.current.params.waveColor = "rgb(255, 255, 255)";
      wavesurferRef.current.params.progressColor = "rgb(185, 180, 180)";
      wavesurferRef.current.params.hideScrollbar = true;
      wavesurferRef.current.params.fillParent = true;
    },
    [songId]
  );

  return (
    <div className={styles.song__info__audio}>
      <div className={styles.song__info__audio__wave}>
        <WaveSurfer onMount={handleWSMount}>
          <WaveForm id={styles.song__info__audio__waveform}></WaveForm>
        </WaveSurfer>
      </div>
      <SongControls songId={songId} wavesurferRef={wavesurferRef} />
    </div>
  );
};

export default SongWave;
