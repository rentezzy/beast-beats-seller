import { useParams } from "react-router-dom";
import { useGetMeQuery } from "../../store/slices/api/authApi";

import ArtistInfo from "./ArtistInfo";
import ArtistPostsFeed from "./artistPosts/artistFeeds/ArtistPostsFeed";
import { ArtistPostControls } from "./artistPosts/ArtistPostControls";

const Artist = () => {
  const { id } = useParams();
  const { data } = useGetMeQuery(null);
  const isMyPage = data?._id === id;
  return (
    <div className="container">
      <ArtistInfo id={id!} />
      {isMyPage && <ArtistPostControls />}
      <ArtistPostsFeed id={id!} />
    </div>
  );
};

export default Artist;
