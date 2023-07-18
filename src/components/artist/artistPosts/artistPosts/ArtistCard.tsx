import { useGetUser } from "../../../../store/hooks";
import { useGetTimeFromNow } from "../../../../utils/utilhooks";

import styles from "../../Artist.module.css";
import { MyButton } from "../../../ui/Controls";
import { IArtistPost } from "../../../../types/api.types";

interface IProps {
  post: IArtistPost;
  isLiked: boolean;
  likes: number;
  className?: string;
  replyesHandler: () => void;
  replyHandler: () => void;
  onLikeHandler: () => () => void;
}

const ArtistCard: React.FC<IProps> = ({
  post,
  isLiked,
  likes,
  className,
  onLikeHandler,
  replyHandler,
  replyesHandler,
}) => {
  const { username, small } = useGetUser(post.author);
  const time = useGetTimeFromNow(post.published);
  const likedClassName = `${
    isLiked ? styles.artist__post_liked : ""
  } noselectText`;
  return (
    <div className={`${styles.artist__post} ${className}`}>
      <div className={`${styles.artist__post__image} noselectText`}>
        <img src={small} alt="" />
      </div>
      <div className={styles.artist__post__info}>
        <div className={styles.artist__post__title}>
          <div>{username}</div>
          <div>{time}</div>
        </div>
        <div className={styles.artist__post__text}>
          <div>{post.text} </div>
          <div onClick={onLikeHandler()} className={likedClassName}>
            {likes} ♡
          </div>
        </div>
        <div className={styles.artist__post__buttons}>
          {post.replyes ? (
            <MyButton onClick={replyesHandler}>REPLYES</MyButton>
          ) : (
            ""
          )}
          <MyButton onClick={replyHandler}>REPLY</MyButton>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
