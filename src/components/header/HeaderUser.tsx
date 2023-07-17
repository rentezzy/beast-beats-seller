import { Link } from "react-router-dom";
import { useLogOutMutation } from "../../store/slices/api/authApi";
import {
  useAppSelector,
  useGetMyAvatar,
  useGetMyName,
} from "../../store/hooks";

import styles from "./Header.module.css";
import cartImage from "../../assests/cart.jpg";

const HeaderUser = () => {
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [logOut] = useLogOutMutation();
  const { small } = useGetMyAvatar();
  const name = useGetMyName();
  if (!isLogined) {
    return (
      <div>
        <Link to="signup" className={styles.header__link}>
          BUY - SELL
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.header__user}>
      <Link to="my-cart">
        <div className={styles.header__user__cart}>
          <img src={cartImage} alt="" />
        </div>
      </Link>
      <Link
        to="my-profile/settings"
        className={`${styles.header__user} ${styles.header__link}`}
      >
        <div className={styles.header__user__image}>
          <img src={small} alt="me" />
        </div>
        <div className={styles.header__user__info}>{name}</div>
      </Link>
      <div className={styles.header__dropdown}>
        <div className={styles.header__arrow}>▼</div>
        <div className={styles.header__dropdownContent}>
          <button onClick={logOut}>log out</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderUser;
