import { useRedirectToStore } from "../../store/hooks";
import { IArtist } from "../../types/auth.types";

interface IProps {
  artist: IArtist;
}

const ArtistPost: React.FC<IProps> = ({ artist }) => {
  const redirect = useRedirectToStore(artist.user);
  return <div onClick={redirect}>{artist.about}</div>;
};

export default ArtistPost;
