import AboutUs from "./AboutUs";
import Faq from "./Faq";
import styles from "./Home.module.css";
import Welcome from "./Welcome";

const Home = () => {
  return (
    <div>
      <Welcome />
      <AboutUs />
      <Faq />
    </div>
  );
};

export default Home;
