import styles from "./Header.module.css";
import HeaderUser from "./HeaderUser";
import HeaderNavigation from "./HeaderNavigation";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__content}>
          <HeaderNavigation />
          <HeaderUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
