import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";

import styles from "./Signup.module.css";
import homeImage from "./../../assests/home.png";

import { MyButton } from "../ui/Controls";
import LoginForm from "./forms/LoginForm";
import SignInForm from "./forms/SignupForm";

const Signup = () => {
  
  const [choosenForm, chooseForm] = useState<"signup" | "login">("login");
  const navigate = useNavigate();
  const isLogined = useAppSelector((state) => state.appState.isLogined);

  if (isLogined) {
    navigate("/home");
  }

  return (
    <div className={styles.signup}>
      <div className="container">
        <div className={styles.homeBlock}>
          <Link to="/home">
            <img src={homeImage} className={styles.homeImage} alt="HOME" />
          </Link>
        </div>
        <div>{choosenForm === "signup" ? <SignInForm /> : <LoginForm />}</div>
        <div className={styles.buttons}>
          <div className={choosenForm === "login" ? styles.choosenButton : ""}>
            <MyButton onClick={() => chooseForm("login")}>login</MyButton>
          </div>
          <div className={choosenForm === "signup" ? styles.choosenButton : ""}>
            <MyButton onClick={() => chooseForm("signup")}>signup</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
