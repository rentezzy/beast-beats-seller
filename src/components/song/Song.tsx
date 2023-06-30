import { useParams } from "react-router-dom";
import { useGetMusicQuery } from "../../store/slices/api/musicApi";

const Song = () => {
  const { id } = useParams();
  const { data } = useGetMusicQuery(id!);
  return <div>Song</div>;
};

export default Song;
