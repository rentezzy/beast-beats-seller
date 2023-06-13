import styles from "./Ui.module.css";

const Ticker: React.FC<{ text: string }> = (props) => {
  return (
    <div className={styles["ticker-wrapper"]}>
      <div className={styles["ticker-wrapper__first-half"]}>
        <p className="noselectText">{props.text}</p>
        <p className="noselectText">{props.text}</p>
        <p className="noselectText">{props.text}</p>
      </div>
      <div className={styles["ticker-wrapper__second-half"]}>
        <p className="noselectText">{props.text}</p>
        <p className="noselectText">{props.text}</p>
        <p className="noselectText">{props.text}</p>
      </div>
    </div>
  );
};

export default Ticker;
