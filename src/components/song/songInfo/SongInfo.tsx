import { useGetUsername } from "../../../store/hooks";
import { useGetTimePublished } from "../../../utils/utilhooks";

import styles from "../Song.module.css";
import SongWave from "./SongWave";
import { IMusicInfo } from "../../../types/auth.types";
import { SeekProps } from "../../../types/home.types";

interface IProps {
  music: IMusicInfo;
  seek: SeekProps;
}

const SongInfo: React.FC<IProps> = ({ music, seek }) => {
  const author = useGetUsername(music.authorId);
  const date = useGetTimePublished(music.published);
  return (
    <div className={styles.song__info}>
      <div className={styles.song__info__image}>
        <img
          src={`${process.env.REACT_APP_MAIN_API}images/mus/${music.image}`}
          alt=""
        />
      </div>
      <div className={styles.song__info__text}>
        <h2>
          {author} - {music.title}
        </h2>
        <div className={styles.song__info__subtext}>
          <div>Genre: {music.genre}</div>
          <div>{date}</div>
          <div>Listenings : {music.listenings}</div>
        </div>
        <SongWave songId={music._id} seek={seek} />
      </div>
    </div>
  );
};

export default SongInfo;
