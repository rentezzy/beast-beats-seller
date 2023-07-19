import { useNavigate } from "react-router-dom";

import styles from "../Home.module.css";
import { AboutUsFirstText, AboutUsSecondText } from "./AboutUsText";
import { IProps } from "../../../types/home.types";

import infoHeadphones from "../../../assests/homePageHeadpohes.jpg";
import infoSynth from "../../../assests/homePageSynth.jpg";

const AboutUs: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.aboutUs} ref={props.blockRef}>
      <div className={styles.aboutUs__buner + " " + styles.buner}>
        <h1>ABOUT US</h1>
      </div>
      <div className="container">
        <div className={styles.aboutUs__block}>
          <div>
            <AboutUsFirstText />
          </div>
          <div className={`${styles.aboutUs__image} noselectText`}>
            <img src={infoHeadphones} alt="" draggable="false" />
          </div>
        </div>
        <div className={styles.aboutUs__block}>
          <div className={`${styles.aboutUs__image} noselectText`}>
            <img src={infoSynth} alt="" draggable="false" />
          </div>
          <div>
            <AboutUsSecondText />
          </div>
        </div>
        <div className={styles.aboutUs__buttonBlock}>
          <button
            className={`${styles.aboutUs__button} noselectText`}
            onClick={navigateHandler}
          >
            <h2>You are Welcome!</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
