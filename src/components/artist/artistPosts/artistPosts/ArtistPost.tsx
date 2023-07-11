import { useArtistPostToggleLike } from "../../../../store/hooks";
import { useReplyes } from "../../../../utils/utilhooks";

import ArtistReplyesFeed from "../artistFeeds/ArtistReplyesFeed";
import ArtistCard from "./ArtistCard";
import { ArtistPostControls } from "../ArtistPostControls";
import { IArtistPost } from "../../../../types/auth.types";

interface IProps {
  post: IArtistPost;
}
const ArtistPost: React.FC<IProps> = ({ post }) => {
  const like = useArtistPostToggleLike(post);
  const { replyOpened, replyesOpened, replyHandler, replyesHandler } =
    useReplyes();

  return (
    <div>
      <ArtistCard
        {...like}
        post={post}
        replyHandler={replyHandler}
        replyesHandler={replyesHandler}
      />
      {replyesOpened && (
        <ArtistReplyesFeed postId={post._id} replyes={post.replyes} />
      )}
      {replyOpened && <ArtistPostControls />}
    </div>
  );
};

export default ArtistPost;
