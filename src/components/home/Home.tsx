import { useRef } from "react";

import Welcome from "./Welcome";
import AboutUs from "./aboutUs/AboutUs";
import Faq from "./faq/Faq";
import News from "./news/News";
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
      <News blockRef={newsFeed} />
      <ScrollTop />
    </div>
  );
};

export default Home;
