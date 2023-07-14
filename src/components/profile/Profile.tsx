import { NavLink, Outlet } from "react-router-dom";
import styles from "./Profile.module.css";
const Profile = () => {
  const styleName = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${styles.linkNavActive} ${styles.linkNav}`
      : styles.linkNav;
  };
  return (
    <div className={`${styles.profile} container`}>
      <nav className={styles.profile__navigation}>
        <NavLink to={"settings"} className={styleName}>
          SETTINGS
        </NavLink>
        <NavLink to={"security"} className={styleName}>
          SECURITY
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Profile;
