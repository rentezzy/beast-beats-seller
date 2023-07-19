import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <hr />
        <div>
          <div className={styles.footer__copyright}>
            <p>
              <em>BBS</em>
            </p>
            <p>© 2023 Beast Beats Seller, not for commercial.</p>
          </div>
          <div>
            <nav>
              <ul className={styles.footer__list}>
                <li>
                  <Link to="/home">home</Link>
                </li>
                <li>
                  <Link to="/store">store</Link>
                </li>
                <li>
                  <Link to="/artists">artists</Link>
                </li>
                <li>
                  <Link to="/my-cart">cart</Link>
                </li>
                <li>
                  <Link to="/my-profile">profile</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
