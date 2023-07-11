import { useGetArtistInfo, useGetUsername } from "../../store/hooks";
import styles from "./Artist.module.css";

interface IProps {
  id: string;
}

const ArtistInfo: React.FC<IProps> = ({ id }) => {
  const { about, big, poster } = useGetArtistInfo(id);
  const username = useGetUsername(id);

  return (
    <div className={styles.artist}>
      <div className={`${styles.artist__name} noselectText`}>
        <h1>{username}</h1>
      </div>
      <div className={`${styles.artist__poster} noselectText`}>
        <img src={poster} alt="" />
      </div>
      <div className={styles.artist__info}>
        <div className={`${styles.artist__image} noselectText`}>
          <img src={big} alt="" />
        </div>
        <div className={styles.artist__about}>{about}</div>
      </div>
      <h2>POSTS:</h2>
    </div>
  );
};

export default ArtistInfo;
