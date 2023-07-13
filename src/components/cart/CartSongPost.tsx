import { useNavigate } from "react-router-dom";
import { useGetUsername, useInCart } from "../../store/hooks";

import styles from "./Cart.module.css";

import { IMusicInfo } from "../../types/auth.types";
import remove from "../../assests/remove.png";

interface IProps {
  music: IMusicInfo;
}

const CartSongPost: React.FC<IProps> = ({ music }) => {
  const { cartHandler } = useInCart(music._id);
  const author = useGetUsername(music.authorId);
  const navigate = useNavigate();

  const navigateHandler = () => navigate(`/song/${music._id}`);

  return (
    <div className={styles.cartSong}>
      <div className={styles.cartSong__image}>
        <img
          src={`${process.env.REACT_APP_MAIN_API}images/mus/${music.image}`}
          alt=""
          onClick={navigateHandler}
        />
      </div>
      <div className={styles.cartSong__info} onClick={navigateHandler}>
        {author} - {music.title}
      </div>
      <div className={styles.cartSong__price}>
        {music.price === 0 ? "Free" : `${music.price}$`}
      </div>
      <div className={`${styles.cartSong__button}`}>
        <img src={remove} alt="" onClick={cartHandler()} />
      </div>
    </div>
  );
};

export default CartSongPost;
