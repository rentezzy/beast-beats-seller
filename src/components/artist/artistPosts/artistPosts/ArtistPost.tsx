import { useArtistPostToggleLike } from "../../../../store/hooks";
import { useReplyes } from "../../../../utils/utilhooks";

import styles from "../../Artist.module.css";
import ArtistReplyesFeed from "../artistFeeds/ArtistReplyesFeed";
import ArtistCard from "./ArtistCard";
import { ArtistReplyControls } from "../ArtistPostControls";
import { IArtistPost } from "../../../../types/api.types";

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
        className={styles.artist__post_skew}
      />
      {replyOpened && <ArtistReplyControls postId={post._id} />}
      {replyesOpened && (
        <ArtistReplyesFeed postId={post._id} replyes={post.replyes} />
      )}
    </div>
  );
};

export default ArtistPost;
