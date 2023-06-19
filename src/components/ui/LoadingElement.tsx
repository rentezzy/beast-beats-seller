import loader from "../../assests/loader.svg";
import styles from "./Ui.module.css";

const LoadingElement = () => {
  return (
    <div className={styles.loadingElement}>
      <img src={loader} alt="loading..." />
    </div>
  );
};

export default LoadingElement;
