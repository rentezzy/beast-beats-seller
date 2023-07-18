import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";

const HeaderNavigation = () => {
  const [burger, setBurger] = useState(false);
  const styleName = ({ isActive }: { isActive: boolean }) => {
    return `${styles.header__link} noselectText ${
      isActive ? styles.header__link_active : ""
    }`;
  };
  const styleNameBurger = `${styles.header__nav} ${
    burger ? styles.active : ""
  }`;
  const burgerHandler = () => setBurger((prev) => !prev);

  return (
    <div>
      <div className={styles.header__burger} onClick={burgerHandler}>
        <span />
      </div>
      <nav className={styleNameBurger}>
        <ul className={styles.header__list}>
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
    </div>
  );
};

export default HeaderNavigation;
