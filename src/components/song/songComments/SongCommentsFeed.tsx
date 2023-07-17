import { createRef, useRef, useCallback, useEffect, useState } from "react";
import { useGetMusicCommentsListQuery } from "../../../store/slices/api/musicApi";

import LoadingElement from "../../ui/LoadingElement";
import SongCommentPost from "./SongCommentPost";
import { SeekProps } from "../../../types/home.types";

interface IProps {
  musicID: string;
  seek: SeekProps;
}

const SongCommentsFeed: React.FC<IProps> = ({ musicID, seek }) => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetMusicCommentsListQuery({
    currentPage: page,
    currentSong: musicID,
  });

  const lastItem = createRef<HTMLDivElement>();
  const observer = useRef<IntersectionObserver>();

  const inSightHandler = useCallback<
    (entries: IntersectionObserverEntry[]) => void
  >(
    (entries) => {
      if (
        !isFetching &&
        data &&
        entries[0].isIntersecting &&
        data.musicComments.length < data.totalCount
      ) {
        setPage((prev) => prev + 1);
      }
    },
    [isFetching, data]
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
  if (!data) return null;
  return (
    <div>
      {data.musicComments.map((comment, index) => {
        if (index + 1 === data.musicComments.length) {
          return (
            <SongCommentPost
              comment={comment}
              ref={lastItem}
              key={comment._id}
              seek={seek}
            />
          );
        }
        return (
          <SongCommentPost comment={comment} key={comment._id} seek={seek} />
        );
      })}
      {isFetching ? <LoadingElement /> : ""}
    </div>
  );
};

export default SongCommentsFeed;
