import styles from "./Home.module.css";
import NewsWaterfall from "./NewsWaterfall";

const NewsFeed = () => {
  return (
    <div className="container">
      <div className={styles.newsFeed}>
        <NewsWaterfall />
        <NewsWaterfall />
        <NewsWaterfall />
      </div>
    </div>
  );
};

export default NewsFeed;
