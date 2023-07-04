import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetMusicQuery } from "../../store/slices/api/musicApi";
import { useGetArtistsQuery } from "../../store/slices/api/artistsApi";

import SongInfo from "./songInfo/SongInfo";
import SongFeed from "./songComments/SongCommentsFeed";
import SongForm from "./songComments/SongForm";
import { useActions } from "../../store/hooks";

const Song = () => {
  const { id } = useParams();
  const { data: musicData } = useGetMusicQuery(id!);
  const { data: artistsData } = useGetArtistsQuery(null);
  const { newSong } = useActions();
  if (!musicData) return <></>;
  newSong(musicData._id);
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
