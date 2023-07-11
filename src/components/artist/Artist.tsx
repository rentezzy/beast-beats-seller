import { useParams } from "react-router-dom";
import ArtistPostsFeed from "./artistPosts/artistFeeds/ArtistPostsFeed";

const Artist = () => {
  const { id } = useParams();
  return (
    <div className="container">
      <ArtistPostsFeed id={id!} />
    </div>
  );
};

export default Artist;
