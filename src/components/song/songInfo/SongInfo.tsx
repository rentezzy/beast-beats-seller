import styles from "../Song.module.css";
import { IMusicInfo } from "../../../types/auth.types";

interface IProps {
  music: IMusicInfo;
  author: string | undefined;
}

const SongInfo: React.FC<IProps> = ({ music, author }) => {
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
      </div>
    </div>
  );
};

export default SongInfo;
