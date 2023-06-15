import styles from "./Home.module.css";
import FaqElement from "./FaqElement";

const Faq = () => {
  const elements: [{ question: string; answer: string }] = [
    {
      question: "How to start buying and selling music?",
      answer:
        "To do this, you need to register or log into an existing account, then follow the store link to see the range of music or fill out the form in your account to start selling music.",
    },
  ];

  return (
    <div className={styles.faq}>
      <div className="container">
        <FaqElement {...elements[0]} />
      </div>
    </div>
  );
};

export default Faq;
