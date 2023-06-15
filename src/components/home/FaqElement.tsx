import { useState } from "react";
import styles from "./Home.module.css";

interface IProps {
  question: string;
  answer: string;
}
const FaqElement: React.FC<IProps> = (props) => {
  const [isShowed, toggleShow] = useState<boolean>(false);

  return (
    <div className={styles.faqElement}>
      <div
        className={styles.faqElement__question}
        onClick={() => toggleShow((prev) => !prev)}
      >
        <p className={`${styles.faqElement__question_mark} noselectText`}>
          <em>?</em>
        </p>
        <p className={`${styles.faqElement__question_text} noselectText`}>
          {props.question}
        </p>
        <p className={`${styles.faqElement__question_arrow} ${isShowed ? styles.faqElement__question_arrow_showed : ""} noselectText`}>❮</p>
      </div>
      <div
        className={`${styles.faqElement__answer} ${
          isShowed ? styles.faqElement__answer_showed : ""
        }`}
      >
        <p>{props.answer}</p>
      </div>
    </div>
  );
};

export default FaqElement;
