import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetMusicQuery } from "../../store/slices/api/musicApi";
import { useGetArtistsQuery } from "../../store/slices/api/artistsApi";

import SongInfo from "./songInfo/SongInfo";
import SongFeed from "./songComments/SongFeed";
import SongForm from "./songComments/SongForm";

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
      <SongForm getTimestamp={() => 0} musicID={musicData._id} />
      <SongFeed />
    </div>
  );
};

export default Song;
