import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetMusicQuery } from "../../store/slices/api/musicApi";
import { useActions } from "../../store/hooks";

import SongInfo from "./songInfo/SongInfo";
import SongFeed from "./songComments/SongCommentsFeed";
import SongForm from "./songComments/SongForm";

const Song = () => {
  const { id } = useParams();
  const { data: musicData } = useGetMusicQuery(id!);
  const { newSong } = useActions();
  useEffect(() => {
    newSong(id!);
  }, [id, newSong]);

  if (!musicData) return <></>;
  return (
    <div className="container">
      <SongInfo music={musicData} />
      <SongForm getTimestamp={() => 0} musicID={musicData._id} />
      <SongFeed musicID={musicData._id} />
    </div>
  );
};

export default Song;
