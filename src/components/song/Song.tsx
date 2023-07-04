import { useParams } from "react-router-dom";
import { useGetMusicQuery } from "../../store/slices/api/musicApi";
import { useGetArtistsQuery } from "../../store/slices/api/artistsApi";

import SongInfo from "./songInfo/SongInfo";
import SongComments from "./songComments/SongComments";

const Song = () => {
  const { id } = useParams();
  const { data: musicData } = useGetMusicQuery(id!);
  const { data: artistsData } = useGetArtistsQuery(null);
  if (!musicData) return <></>;
  let author: string | undefined = "author";
  if (artistsData) {
    author = artistsData.find(
      (arthist) => arthist._id === musicData.authorId
    )?.username;
  }
  return (
    <div className="container">
      <SongInfo music={musicData} author={author} />
      <SongComments />
    </div>
  );
};

export default Song;
