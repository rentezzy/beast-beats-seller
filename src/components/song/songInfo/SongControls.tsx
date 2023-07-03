import { useState } from "react";
import { useInCart } from "../../../store/hooks";

import styles from "../Song.module.css";
import pause from "../../../assests/ui/player/pause.png";
import play from "../../../assests/ui/player/play.png";
import cart from "../../../assests/cart.jpg";

interface IProps {
  songId: string;
  wavesurferRef: React.MutableRefObject<any>;
}

const SongControls: React.FC<IProps> = ({ songId, wavesurferRef }) => {
  const { inCart, cartHandler } = useInCart(songId);
  const [isPlaying, setPlaying] = useState(false);
  const playPauseHandler = () => {
    wavesurferRef.current.playPause();
    setPlaying((prev) => !prev);
  };
  return (
    <div className={styles.song__info__audio__buttons}>
      <button onClick={playPauseHandler}>
        <img src={isPlaying ? pause : play} alt="" />
      </button>
      {!inCart ? (
        <button onClick={cartHandler()}>
          <img src={cart} alt="" />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SongControls;
