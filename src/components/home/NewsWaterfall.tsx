import styles from "./Home.module.css";
import NewsPost from "./NewsPost";

const NewsWaterfall = () => {
  return (
    <div className={styles.newsWaterfall}>
      <NewsPost text="News post"/>
      <NewsPost text="lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum"/>
      <NewsPost text="News post"/>
    </div>
  );
};

export default NewsWaterfall;
