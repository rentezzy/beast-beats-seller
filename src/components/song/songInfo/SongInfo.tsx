import styles from "../Song.module.css";
import SongWave from "./SongWave";
import { IMusicInfo } from "../../../types/auth.types";
import { useGetUsername } from "../../../store/hooks";

interface IProps {
  music: IMusicInfo;
}

const SongInfo: React.FC<IProps> = ({ music }) => {
  const author = useGetUsername(music.authorId);
  const date = new Date(music.published);
  const dateString = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDay()} - ${date.getHours()}:${date.getMinutes()}`;
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
          <div>Published : {dateString}</div>
          <div>Listenings : {music.listenings}</div>
        </div>
        <SongWave songId={music._id} />
      </div>
    </div>
  );
};

export default SongInfo;
