import styles from "./ui.module.css";
import loader from "../../assests/loader.svg";

interface IProps {
  isInitialized: boolean;
}

const LoadingPage: React.FC<IProps> = ({ isInitialized }) => {
  const className = `${styles.loadingPage} ${
    isInitialized && styles.loadingPage_delete
  }`;

  return (
    <div className={className}>
      <img src={loader} alt="loader" />
    </div>
  );
};

export default LoadingPage;
