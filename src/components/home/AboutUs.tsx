import React from "react";
import styles from "./Home.module.css";
import buner from "../../assests/homePageBuner.jpg";
import infoHeadphones from "../../assests/homePageHeadpohes.jpg";
import infoSynth from "../../assests/homePageSynth.jpg";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.aboutUs}>
      <div className={styles.aboutUs__bunerBlock}>
        {/* <img
          className={`${styles.aboutUs__buner} noselectText`}
          src={buner}
          alt=""
          draggable="false"
        /> */}
        <h1>ABOUT US</h1>
      </div>
      <div className="container">
        <div className={styles.aboutUs__block}>
          <div>
            <p>
              At <strong>Beast Beats Seller,</strong> we are passionate about
              connecting talented musicians, producers, and music enthusiasts
              from around the world. We have created a vibrant online
              marketplace where artists can showcase their creative genius and
              music lovers can discover extraordinary beats that move their
              souls.
            </p>
            <p>
              Our platform serves as a hub for both established artists and
              rising stars to monetize their musical talent. Whether you're a
              seasoned professional or an aspiring artist looking to break into
              the industry, <strong>Beast Beats Seller </strong> provides a
              platform to showcase your unique style and reach a global
              audience.
            </p>
            <p>
              We understand the power of music in creating unforgettable
              experiences, and that's why we're committed to curating the
              highest quality beats and instrumentals. Our marketplace hosts an
              extensive collection of diverse genres, including hip-hop, R&B,
              pop, electronic, rock, and many more. Whatever your musical taste
              or project needs, we have the perfect beat to enhance your sound.
            </p>
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
            <p>
              Not only do we prioritize exceptional musical content, but we also
              foster a supportive and collaborative community. Beast Beats
              Seller is a place where artists can connect, collaborate, and grow
              together. We encourage artists to share their knowledge, exchange
              ideas, and inspire each other to push the boundaries of
              creativity.
            </p>
            <p>
              Our dedicated team works tirelessly to ensure a seamless user
              experience. We provide powerful search and filtering tools, secure
              payment gateways, and user-friendly interfaces to make your
              journey on Beast Beats Seller effortless and enjoyable.
            </p>
            <p>
              So, whether you're a musician searching for the perfect backing
              track, a producer seeking fresh talent, or simply a music
              enthusiast looking for incredible beats, Beast Beats Seller is
              your go-to destination. Join our vibrant community today and
              unleash the power of your music like never before.
            </p>
          </div>
        </div>
        <div className={styles.aboutUs__buttonBlock}>
          <button
            className={`${styles.aboutUs__button} noselectText`}
            onClick={() => {
              navigate("/signup");
            }}
          >
            <h2>You are Welcome!</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
