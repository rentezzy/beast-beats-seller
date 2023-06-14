import { useGetAppInfoQuery } from "../../store/slices/api/appApi";
import styles from "./Home.module.css";
import Ticker from "../ui/Ticker";

const Welcome = () => {
  const { data, isSuccess } = useGetAppInfoQuery(null);

  return (
    <div>
      <Ticker text={isSuccess ? data.ticker : ""} />
      <div className="container">
        <div className={styles.welcome}>
          <h1>BEAST BEATS SELLER</h1>
          <div className={styles.welcome__upperButtons}>
            <div>
              <button
                className={`${styles.welcome__button} ${styles.welcome__button_aboutUs} noselectText`}
              >
                ABOUT US
              </button>
            </div>
            <div>
              <button
                className={`${styles.welcome__button} ${styles.welcome__button_faq} noselectText`}
              >
                FAQ
              </button>
            </div>
          </div>
          <div className={styles.welcome__bottomButtons}>
            <button
              className={`${styles.welcome__button} ${styles.welcome__button_news} noselectText`}
            >
              NEWS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
