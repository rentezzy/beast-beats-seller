import { useEffect, useRef } from "react";
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
  const seek = useRef({ set: (a: number) => {}, get: () => 5 });
  useEffect(() => {
    newSong(id!);
  }, [id, newSong]);

  if (!musicData) return <></>;
  return (
    <div className="container">
      <SongInfo music={musicData} seek={seek} />
      <SongForm musicID={musicData._id} seek={seek} />
      <SongFeed musicID={musicData._id} seek={seek} />
    </div>
  );
};

export default Song;
