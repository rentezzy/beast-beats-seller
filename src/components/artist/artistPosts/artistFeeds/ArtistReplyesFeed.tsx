import { useArtistsPostReplyesPagination } from "../../../../store/hooks";

import styles from "../../Artist.module.css";
import LoadingElement from "../../../ui/LoadingElement";
import ArtistReply from "../artistPosts/ArtistReply";
import { MyButton } from "../../../ui/Controls";

interface IProps {
  postId: string;
  replyes: number;
}

const ArtistReplyesFeed: React.FC<IProps> = ({ postId, replyes }) => {
  const { posts, isAll, isFetching, nextPage } =
    useArtistsPostReplyesPagination(postId, replyes);
  return (
    <div className={styles.artist__feed__replyes}>
      {posts && posts.map((post) => <ArtistReply post={post} key={post._id} />)}
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

export default ArtistReplyesFeed;
