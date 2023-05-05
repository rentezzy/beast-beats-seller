import HeaderNavigation from "./HeaderNavigation";
import HeaderUser from "./HeaderUser";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <HeaderNavigation />
          <HeaderUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
