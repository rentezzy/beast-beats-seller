import { Link } from "react-router-dom";
import cartImage from "../../assests/cart.jpg";
import { useAppSelector } from "../../store/hooks";
import {
  useGetMeQuery,
  useLogOutMutation,
} from "../../store/slices/api/authApi";
import styles from "./Header.module.css";

const HeaderUser = () => {
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const [logOut] = useLogOutMutation();
  const { data } = useGetMeQuery(null);
  if (!isLogined) {
    return (
      <div>
        <Link to="signup" className={styles.linkNav}>
          BUY - SELL
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.userCard}>
      <Link to="my-cart">
        <div className={styles.userCart}>
          <img src={cartImage} alt="" />
        </div>
      </Link>
      <Link to="my-profile" className={styles.userCard + " " + styles.linkNav}>
        <div className={styles.userImage}>
          <img
            src={
              data?.avatar === "/default"
                ? `${process.env.REACT_APP_MAIN_API}images/img/default.png`
                : `${process.env.REACT_APP_MAIN_API}images/img/${data?._id}/small.png`
            }
            alt="logo"
          />
        </div>
        <div className={styles.userInfo}>{data?.name}</div>
      </Link>
      <div className={styles.dropdown}>
        <div className={styles.arrow}>▼</div>
        <div className={styles.dropdownContent}>
          <button onClick={logOut}>log out</button>
        </div>
      </div>
    </div>
  );
};

export default HeaderUser;
