import { useArtistPostReplyToggleLike } from "../../../../store/hooks";
import { useReplyes } from "../../../../utils/utilhooks";

import styles from "../../Artist.module.css";
import ArtistCard from "./ArtistCard";
import ArtistReplyToReplyFeed from "./../artistFeeds/ArtistReplyesToReplyesFeed";
import { ArtistReplyControls } from "./../ArtistPostControls";
import { IArtistPostReply } from "../../../../types/api.types";

interface IProps {
  post: IArtistPostReply;
}

const ArtistReply: React.FC<IProps> = ({ post }) => {
  const like = useArtistPostReplyToggleLike(post);
  const { replyOpened, replyesOpened, replyHandler, replyesHandler } =
    useReplyes();

  return (
    <div className={styles.artist__post_95}>
      <ArtistCard
        {...like}
        post={post}
        replyHandler={replyHandler}
        replyesHandler={replyesHandler}
      />
      {replyOpened && (
        <ArtistReplyControls postId={post.originTo} replyTo={post._id} />
      )}
      {replyesOpened && (
        <ArtistReplyToReplyFeed postId={post._id} replyes={post.replyes} />
      )}
    </div>
  );
};

export default ArtistReply;
