import styles from "./Home.module.css";
import AboutUs from "./AboutUs";
import Faq from "./Faq";
import NewsFeed from "./NewsFeed";
import Welcome from "./Welcome";
import { useRef } from "react";
import ScrollTop from "../ui/ScrollTop";

const Home = () => {
  const aboutUs = useRef<HTMLDivElement>(null);
  const faq = useRef<HTMLDivElement>(null);
  const newsFeed = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Welcome aboutUsRef={aboutUs} faqRef={faq} newsFeedRef={newsFeed} />
      <AboutUs blockRef={aboutUs} />
      <Faq blockRef={faq} />
      <NewsFeed blockRef={newsFeed} />
      <ScrollTop />
    </div>
  );
};

export default Home;
