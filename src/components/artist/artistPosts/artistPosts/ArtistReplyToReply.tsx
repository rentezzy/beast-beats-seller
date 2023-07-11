import { useReplyes } from "../../../../utils/utilhooks";
import { useArtistPostReplyToReplyToggleLike } from "../../../../store/hooks";

import styles from "../../Artist.module.css";
import ArtistCard from "./ArtistCard";
import ArtistReplyToReplyFeed from "./../artistFeeds/ArtistReplyesToReplyesFeed";
import { ArtistPostControls } from "./../ArtistPostControls";
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
      {replyesOpened && (
        <ArtistReplyToReplyFeed postId={post._id} replyes={post.replyes} />
      )}
      {replyOpened && <ArtistPostControls />}
    </div>
  );
};

export default ArtistReplyToReply;
