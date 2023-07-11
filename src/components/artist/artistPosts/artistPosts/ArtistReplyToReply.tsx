import { useReplyes } from "../../../../utils/utilhooks";
import { useArtistPostReplyToReplyToggleLike } from "../../../../store/hooks";

import styles from "../../Artist.module.css";
import ArtistCard from "./ArtistCard";
import ArtistReplyToReplyFeed from "./../artistFeeds/ArtistReplyesToReplyesFeed";
import { ArtistReplyControls } from "./../ArtistPostControls";
import { IArtistPostReply } from "../../../../types/auth.types";

interface IProps {
  post: IArtistPostReply;
}

const ArtistReplyToReply: React.FC<IProps> = ({ post }) => {
  const like = useArtistPostReplyToReplyToggleLike(post);

  const { replyOpened, replyesOpened, replyHandler, replyesHandler } =
    useReplyes();

  return (
    <div className={styles.artist__post_99}>
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

export default ArtistReplyToReply;
