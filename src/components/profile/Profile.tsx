import { NavLink, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../store/slices/api/authApi";

import styles from "./Profile.module.css";
import { Protect } from "../../utils/Protect";

const styleName = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? `${styles.linkNavActive} ${styles.linkNav}`
    : styles.linkNav;
};

const stringToNav = (route: string) => (
  <NavLink to={route} className={styleName} key={route}>
    {route.toUpperCase()}
  </NavLink>
);

const user = ["settings", "security"].map(stringToNav);

const artist = ["artist"].map(stringToNav);

const Profile = () => {
  const { data } = useGetMeQuery(null);

  return (
    <div className={`${styles.profile} container`}>
      <Protect />
      <nav className={styles.profile__navigation}>
        {user}
        {data!.role === "artist" ? artist : ""}
      </nav>
      <div className={styles.profile__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
