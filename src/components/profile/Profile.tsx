import { NavLink, Outlet } from "react-router-dom";
import styles from "./Profile.module.css";
import Protect from "../../utils/Protect";
const Profile = () => {
  const styleName = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${styles.linkNavActive} ${styles.linkNav}`
      : styles.linkNav;
  };
  return (
    <div className={`${styles.profile} container`}>
      <Protect />
      <nav className={styles.profile__navigation}>
        <NavLink to={"settings"} className={styleName}>
          SETTINGS
        </NavLink>
        <NavLink to={"security"} className={styleName}>
          SECURITY
        </NavLink>
      </nav>
      <div className={styles.profile__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
