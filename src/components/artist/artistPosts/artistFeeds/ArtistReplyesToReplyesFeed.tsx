import { useArtistsPostReplyToReplyPagination } from "../../../../store/hooks";

import styles from "../../Artist.module.css";
import LoadingElement from "../../../ui/LoadingElement";
import ArtistReplyToReply from "../artistPosts/ArtistReplyToReply";
import { MyButton } from "../../../ui/Controls";

interface IProps {
  postId: string;
  replyes: number;
}

const ArtistReplyToReplyFeed: React.FC<IProps> = ({ postId, replyes }) => {
  const { posts, isAll, isFetching, nextPage } =
    useArtistsPostReplyToReplyPagination(postId, replyes);
  return (
    <div className={styles.artist__feed__replyes}>
      {posts &&
        posts.map((post) => <ArtistReplyToReply post={post} key={post._id} />)}
      {isAll || (
        <div className={styles.artist__feed__button}>
          <MyButton onClick={nextPage} disabled={isFetching}>
            {isFetching ? <LoadingElement /> : "⮛ show more replyes ⮛"}
          </MyButton>
        </div>
      )}
    </div>
  );
};

export default ArtistReplyToReplyFeed;
