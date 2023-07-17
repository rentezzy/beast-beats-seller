import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const HeaderNavigation = () => {
  const styleName = ({ isActive }: { isActive: boolean }) => {
    return `${styles.header__link} noselectText ${
      isActive ? styles.header__link_active : ""
    }`;
  };

  return (
    <nav>
      <ul className={styles.header__nav}>
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
