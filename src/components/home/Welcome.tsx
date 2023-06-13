import { useGetAppInfoQuery } from "../../store/slices/api/appApi";
import styles from "./Home.module.css";
import Ticker from "../ui/Ticker";

const Welcome = () => {
  const { data, isSuccess } = useGetAppInfoQuery(null);

  return (
    <div className={styles.home}>
      <Ticker text={isSuccess ? data.ticker : ""} />
      <div className="container">
        <div className={styles.mainDiv}>
          <div className={styles.mainHeader}>
            <h1>BEAST</h1>
            <h1>BEATS</h1>
            <h1>SELLER</h1>
          </div>
          <div className={styles.mainInfo}>
            <p>
              Welcome to Beast Beats Seller, your ultimate destination for all
              things music! Our platform serves as a hub for both established
              artists and rising stars to monetize their musical talent. Whether
              you're a seasoned professional or an aspiring artist looking to
              break into the industry, Beast Beats Seller provides a platform to
              showcase your unique style and reach a global audience. Beast
              Beats Seller is a place where artists can connect, collaborate,
              and grow together. We encourage artists to share their knowledge,
              exchange ideas, and inspire each other to push the boundaries of
              creativity. We provide powerful search and filtering tools, secure
              payment gateways. So, whether you're a musician searching for the
              perfect backing track, a producer seeking fresh talent, or simply
              a music enthusiast looking for incredible beats, Beast Beats
              Seller is your go-to destination. Join our vibrant community today
              and unleash the power of your music like never before. Welcome to
              Beast Beats Seller – where music thrives!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
