import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetMusicQuery } from "../../store/slices/api/musicApi";
import { useGetArtistsQuery } from "../../store/slices/api/artistsApi";
import { useActions } from "../../store/hooks";

import SongInfo from "./songInfo/SongInfo";
import SongFeed from "./songComments/SongCommentsFeed";
import SongForm from "./songComments/SongForm";

const Song = () => {
  const { id } = useParams();
  const { data: musicData } = useGetMusicQuery(id!);
  const { data: artistsData } = useGetArtistsQuery(null);
  const { newSong } = useActions();
  useEffect(() => {
    newSong(id!);
  }, [id, newSong]);

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
      <SongFeed musicID={musicData._id} />
    </div>
  );
};

export default Song;
