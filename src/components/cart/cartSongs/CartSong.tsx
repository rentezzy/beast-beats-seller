import { useGetMusicQuery } from "../../../store/slices/api/musicApi";
import styles from "../Cart.module.css";
import CartSongPost from "./CartSongPost";
import { Checkbox } from "../../ui/Controls";

interface IProps {
  songId: string;
}

const CartSong: React.FC<IProps> = ({ songId }) => {
  const { data } = useGetMusicQuery(songId);

  if (!data) return <></>;

  return (
    <div className={styles.cart__song}>
      <div className={styles.cart__song__checkbox}>
        <Checkbox name={songId} />
      </div>
      <CartSongPost music={data} />
    </div>
  );
};

export default CartSong;
