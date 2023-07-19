import styles from "../Home.module.css";
import NewsFeed from "./NewsFeed";

interface IProps {
  blockRef: React.RefObject<HTMLDivElement>;
}

const News: React.FC<IProps> = (props) => {
  return (
    <div ref={props.blockRef}>
      <div className={`${styles.buner} ${styles.news__buner}`}>
        <h1>NEWS</h1>
      </div>
      <NewsFeed />
    </div>
  );
};

export default News;
