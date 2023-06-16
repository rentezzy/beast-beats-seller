import styles from "./Home.module.css";

const NewsPost: React.FC<{ text: string }> = ({ text }) => {
  return <div className={styles.newsPost}>{text}</div>;
};

export default NewsPost;
