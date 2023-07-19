import { useAppSelector } from "../../../store/hooks";

import styles from "../Home.module.css";
import FaqElement from "./FaqElement";
import { IFaqProps, IProps } from "../../../types/home.types";

const Faq: React.FC<IProps> = (props) => {
  const elements: IFaqProps[] = useAppSelector((state) => state.faq.faqs);

  return (
    <div className={styles.faq} ref={props.blockRef}>
      <div className={`${styles.faq__buner} ${styles.buner}`}>
        <h1>FAQ</h1>
      </div>
      <div className="container">
        {elements.map((element) => (
          <FaqElement {...element} key={element.question} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
