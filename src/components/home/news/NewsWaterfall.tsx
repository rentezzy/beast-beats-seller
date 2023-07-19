import { createRef, useCallback, useEffect, useRef } from "react";

import { useActions } from "../../../store/hooks";

import styles from "../Home.module.css";
import NewsPost from "./NewsPost"
import { INewsPost } from "../../../types/api.types";

interface IProps {
  posts: Array<INewsPost>;
  isFetching: boolean;
  totalCount: number;
  currentCount: number;
}

const NewsWaterfall: React.FC<IProps> = ({
  posts,
  isFetching,
  totalCount,
  currentCount,
}) => {
  const lastItem = createRef<HTMLDivElement>();
  const observer = useRef<IntersectionObserver>();

  const { nextPage } = useActions();

  const inSightHandler = useCallback<
    (entries: IntersectionObserverEntry[]) => void
  >(
    (entries) => {
      if (
        !isFetching &&
        entries[0].isIntersecting &&
        currentCount < totalCount
      ) {
        nextPage();
      }
    },
    [isFetching, currentCount, nextPage, totalCount]
  );

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(inSightHandler);
    if (lastItem.current) {
      observer.current.observe(lastItem.current);
    }
  }, [lastItem, inSightHandler]);

  return (
    <div className={styles.newsWaterfall}>
      {posts.map((post, index) => {
        if (index + 1 === posts.length) {
          return <NewsPost post={post} ref={lastItem} key={post._id} />;
        }
        return <NewsPost post={post} key={post._id} />;
      })}
    </div>
  );
};

export default NewsWaterfall;
