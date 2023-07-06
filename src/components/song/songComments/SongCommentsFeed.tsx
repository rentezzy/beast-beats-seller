import { createRef, useRef, useCallback, useEffect } from "react";
import { useActions, useAppSelector } from "../../../store/hooks";
import { useGetMusicCommentsListQuery } from "../../../store/slices/api/musicApi";

import LoadingElement from "../../ui/LoadingElement";
import SongCommentPost from "./SongCommentPost";
import { SeekProps } from "../../../types/home.types";

interface IProps {
  musicID: string;
  seek: SeekProps;
}

const SongCommentsFeed: React.FC<IProps> = ({ musicID, seek }) => {
  const comments = useAppSelector((state) => state.musicComments);
  const { isFetching } = useGetMusicCommentsListQuery({
    currentPage: comments.currentPage,
    currentSong: musicID,
  });

  const lastItem = createRef<HTMLDivElement>();
  const observer = useRef<IntersectionObserver>();

  const { nextPageMusicComments } = useActions();

  const inSightHandler = useCallback<
    (entries: IntersectionObserverEntry[]) => void
  >(
    (entries) => {
      if (
        !isFetching &&
        entries[0].isIntersecting &&
        comments.musicComments.length < comments.totalCount
      ) {
        nextPageMusicComments();
      }
    },
    [isFetching, comments, nextPageMusicComments]
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
    <div>
      {comments.musicComments.map((comment, index) => {
        if (index + 1 === comments.musicComments.length) {
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
