import { createRef, useCallback, useEffect, useRef } from "react";

import { useActions, useAppSelector } from "../../../store/hooks";
import { useGetMusicListQuery } from "../../../store/slices/api/musicApi";
import styles from "../Store.module.css";
import MusicPost from "./MusicPost";
import LoadingElement from "../../ui/LoadingElement";

const MusicFeed = () => {
  const musics = useAppSelector((state) => state.musics);
  const { isFetching } = useGetMusicListQuery({
    ...musics.filters,
    currentPage: musics.currentPage,
  });

  const lastItem = createRef<HTMLDivElement>();
  const observer = useRef<IntersectionObserver>();

  const { nextPageMusic } = useActions();

  const inSightHandler = useCallback<
    (entries: IntersectionObserverEntry[]) => void
  >(
    (entries) => {
      if (
        !isFetching &&
        entries[0].isIntersecting &&
        musics.musics.length < musics.totalCount
      ) {
        nextPageMusic();
      }
    },
    [isFetching, musics, nextPageMusic]
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
    <div className={styles.musicPost__list}>
      {musics.musics.map((music, index) => {
        if (index + 1 === musics.musics.length) {
          return <MusicPost music={music} ref={lastItem} key={music._id} />;
        }
        return <MusicPost music={music} key={music._id} />;
      })}
      {isFetching ? <LoadingElement /> : ""}
    </div>
  );
};

export default MusicFeed;
