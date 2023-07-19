import { useArtistsPostPagination } from "../../../../store/hooks";

import styles from "../../Artist.module.css";
import ArtistPost from "../artistPosts/ArtistPost";
import LoadingElement from "../../../ui/LoadingElement";
import { MyButton } from "../../../ui/Controls";

interface IProps {
  id: string;
}

const ArtistPostsFeed: React.FC<IProps> = ({ id }) => {
  const { posts, isAll, isFetching, nextPage } = useArtistsPostPagination(id);
  return (
    <div className={styles.artist__feed}>
      {posts && posts.map((post) => <ArtistPost post={post} key={post._id} />)}
      {isAll || (
        <div className={styles.artist__feed__button}>
          <MyButton onClick={nextPage} disabled={isFetching}>
            {isFetching ? <LoadingElement /> : "⮛ show more ⮛"}
          </MyButton>
        </div>
      )}
    </div>
  );
};

export default ArtistPostsFeed;
