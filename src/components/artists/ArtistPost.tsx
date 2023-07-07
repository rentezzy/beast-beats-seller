import { useRedirectToStore } from "../../store/hooks";
import styles from "./Artists.module.css";
import { IArtist } from "../../types/auth.types";

interface IProps {
  artist: IArtist;
  pos: number;
}

const ArtistPost: React.FC<IProps> = ({ artist, pos }) => {
  const redirectHandler = useRedirectToStore(artist.user);

  return (
    <div className={styles.artist__post}>
      {pos !== 0 && <ArtistImage image={artist.avatar.big} />}
      <div className={styles.artist__about}>
        <div className={styles.artist__text}>{artist.about}</div>
        <div className={styles.artist__buttons}>
          <div>
            <button onClick={redirectHandler}>music</button>
          </div>
          <div>
            <button>profile</button>
          </div>
        </div>
      </div>
      {pos || <ArtistImage image={artist.avatar.big} />}
    </div>
  );
};

interface IImageProps {
  image: string;
}
const ArtistImage: React.FC<IImageProps> = ({ image }) => {
  return (
    <div className={styles.artist__image}>
      <img src={image} alt="" />
    </div>
  );
};

export default ArtistPost;
