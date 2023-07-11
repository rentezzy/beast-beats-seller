import { useArtistPostToggleLike } from "../../../../store/hooks";
import { useReplyes } from "../../../../utils/utilhooks";

import ArtistReplyesFeed from "../artistFeeds/ArtistReplyesFeed";
import ArtistCard from "./ArtistCard";
import { ArtistReplyControls } from "../ArtistPostControls";
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
      {replyOpened && <ArtistReplyControls postId={post.originTo} />}
      {replyesOpened && (
        <ArtistReplyesFeed postId={post._id} replyes={post.replyes} />
      )}
    </div>
  );
};

export default ArtistPost;
