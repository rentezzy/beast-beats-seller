import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const HeaderNavigation = () => {
  const styleName = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${styles.linkNavActive} ${styles.linkNav}`
      : styles.linkNav;
  };
  
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink to="home" className={styleName}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="store" className={styleName}>
            STORE
          </NavLink>
        </li>
        <li>
          <NavLink to="artists" className={styleName}>
            ARTISTS
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
