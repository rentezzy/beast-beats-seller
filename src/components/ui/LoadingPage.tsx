import loader from "../../assests/loader.svg";
import styles from "./Ui.module.css";

const LoadingPage = (props: { isInitialized: boolean }) => {
  return (
    <div
      className={`${styles.page} ${props.isInitialized ? styles.delete : ""}`}
    >
      <img className={styles.image} src={loader} alt="loader" />
    </div>
  );
};

export default LoadingPage;
