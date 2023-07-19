import { useEffect, useState } from "react";
import styles from "./ui.module.css";

const ScrollTop = () => {
  const [isDisplayed, setDisplay] = useState<boolean>(false);
  useEffect(() => {
    const onScrollHandler = () => {
      if (window.scrollY > 300) setDisplay(true);
      if (window.scrollY < 300) setDisplay(false);
    };
    document.addEventListener("scroll", onScrollHandler);
    return () => {
      document.removeEventListener("scroll", onScrollHandler);
    };
  }, []);

  return (
    <div
      className={isDisplayed ? styles.scrollTop : styles.scrollTop_noDisplay}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      🠕
    </div>
  );
};

export default ScrollTop;
