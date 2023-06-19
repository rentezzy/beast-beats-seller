import { useGetAppInfoQuery } from "../../store/slices/api/appApi";
import styles from "./Home.module.css";
import Ticker from "../ui/Ticker";

interface IProps {
  aboutUsRef: React.RefObject<HTMLDivElement>;
  faqRef: React.RefObject<HTMLDivElement>;
  newsFeedRef: React.RefObject<HTMLDivElement>;
}

const Welcome: React.FC<IProps> = (props) => {
  const { data, isSuccess } = useGetAppInfoQuery(null);

  const navigateCLickHandler = (ref: React.RefObject<HTMLDivElement>) => () =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

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
                onClick={navigateCLickHandler(props.aboutUsRef)}
              >
                ABOUT US
              </button>
            </div>
            <div>
              <button
                className={`${styles.welcome__button} ${styles.welcome__button_faq} noselectText`}
                onClick={navigateCLickHandler(props.faqRef)}
              >
                FAQ
              </button>
            </div>
          </div>
          <div className={styles.welcome__bottomButtons}>
            <button
              className={`${styles.welcome__button} ${styles.welcome__button_news} noselectText`}
              onClick={navigateCLickHandler(props.newsFeedRef)}
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
