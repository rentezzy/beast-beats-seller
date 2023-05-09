import { useState } from "react";
import styles from "./Signup.module.css";
import { SignInForm, LoginForm } from "./SignupForms";
import { MyButton } from "../ui/Controls";

const Signup = () => {
  const [choosenForm, chooseForm] = useState<"signup" | "login">("login");

  return (
    <div className={styles.signup}>
      <div className="container">
        <div>{choosenForm === "signup" ? <SignInForm /> : <LoginForm />}</div>
        <div className={styles.buttons}>
          <div>
            <MyButton onClick={() => chooseForm("login")}>login</MyButton>
          </div>
          <div>
            <MyButton onClick={() => chooseForm("signup")}>signup</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
