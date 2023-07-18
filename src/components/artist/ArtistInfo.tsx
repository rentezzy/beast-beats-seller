import { useGetArtist, useGetUser } from "../../store/hooks";
import styles from "./Artist.module.css";

interface IProps {
  id: string;
}

const ArtistInfo: React.FC<IProps> = ({ id }) => {
  const { about, big, poster } = useGetArtist(id);
  const { username } = useGetUser(id);

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
