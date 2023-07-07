import { useGetUsername, useRedirectToStore } from "../../store/hooks";

import styles from "./Artists.module.css";
import { IArtist } from "../../types/auth.types";
import { MyButton } from "../ui/Controls";
import { useNavigate } from "react-router-dom";

interface IProps {
  artist: IArtist;
  pos: number;
}

const ArtistPost: React.FC<IProps> = ({ artist, pos }) => {
  const musicHandler = useRedirectToStore(artist.user);
  const username = useGetUsername(artist.user);
  const navigate = useNavigate();

  const profileHandler = () => navigate(`/artist/${artist.user}`);
  return (
    <div className={styles.artist__post}>
      {pos !== 0 && <ArtistImage image={artist.avatar.big} />}
      <div className={styles.artist__about}>
        <div className={styles.artist__title}>
          <h2>{username}</h2>
        </div>
        <div className={styles.artist__text}>{artist.about}</div>
        <div className={styles.artist__buttons}>
          <div>
            <MyButton onClick={musicHandler}>MUSIC</MyButton>
          </div>
          <div>
            <MyButton onClick={profileHandler}>PROFILE</MyButton>
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
  const src = `${process.env.REACT_APP_MAIN_API}images/artists/big/${image}`;
  return (
    <div className={styles.artist__image}>
      <img src={src} alt="" />
    </div>
  );
};

export default ArtistPost;
