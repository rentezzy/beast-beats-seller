import { useAppSelector } from "../../store/hooks";
import { useGetNewsPostsQuery } from "../../store/slices/api/newsApi";

import styles from "./Home.module.css";
import NewsWaterfall from "./NewsWaterfall";
import { INewsPost } from "../../types/auth.types";
import LoadingElement from "../ui/LoadingElement";


const NewsFeed = () => {
  const newsPosts = useAppSelector((state) => state.newsPosts);
  const { isFetching } = useGetNewsPostsQuery(newsPosts.currentPage);

  let posts: Array<Array<INewsPost>> = [[], [], []];

  if (!newsPosts.posts.length) return <LoadingElement />;

  for (let i = 0; i < newsPosts.posts.length; i++) {
    posts[i % 3].push(newsPosts.posts[i]);
  }

  return (
    <div className="container">
      <div className={styles.newsFeed}>
        {posts.map((post, index) => (
          <NewsWaterfall
            key={index}
            posts={post}
            currentCount={newsPosts.posts.length}
            totalCount={newsPosts.totalCount}
            isFetching={isFetching}
          />
        ))}
      </div>
      {isFetching ? <LoadingElement /> : ""}
    </div>
  );
};

export default NewsFeed;
