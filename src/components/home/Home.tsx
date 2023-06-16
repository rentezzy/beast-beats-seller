import AboutUs from "./AboutUs";
import Faq from "./Faq";
import styles from "./Home.module.css";
import NewsFeed from "./NewsFeed";
import Welcome from "./Welcome";

const Home = () => {
  return (
    <div>
      <Welcome />
      <AboutUs />
      <Faq />
      <NewsFeed />
    </div>
  );
};

export default Home;
