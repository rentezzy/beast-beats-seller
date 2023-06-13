import { useGetAppInfoQuery } from "../../store/slices/api/appApi";
import styles from "./Home.module.css";
import Ticker from "../ui/Ticker";
import bgimage from "../../assests/homePageBG.svg";

const Home = () => {
  const { data, isSuccess } = useGetAppInfoQuery(null);

  return (
    <div className={styles.home}>
      <Ticker text={isSuccess ? data.ticker : ""} />
      <div className="container">
        <div className={styles.mainDiv}>
          <img
            src={bgimage}
            alt=""
            className={`${styles.mainImage} noselectText`}
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
