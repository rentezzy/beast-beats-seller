import * as Yup from "yup";
import { Form, Formik } from "formik";

import { useNavigate } from "react-router-dom";
import { usePostSignupMutation } from "../../../store/slices/api/authApi";

import styles from "./../Signup.module.css";
import { MyButton, MyTextInput } from "../../ui/Controls";
import {
  emailYup,
  nameYup,
  passwordYup,
  usernameYup,
} from "../../../utils/validators";

const SignInForm = () => {
  const [signup, { error, isLoading, isSuccess }] = usePostSignupMutation();
  const navigate = useNavigate();
  if (isSuccess) {
    navigate("/home");
  }
  return (
    <div className={styles.form}>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values) => {
          signup(values);
        }}
        validationSchema={Yup.object({
          name: nameYup.required(),
          username: usernameYup.required(),
          email: emailYup.required(),
          password: passwordYup.required(),
          passwordConfirm: passwordYup.required(
            "password confirm is a required field"
          ),
        })}
      >
        <Form className={styles.form__controls_signup}>
          <div>
            <MyTextInput name="name" type="text" label="name" />
            <MyTextInput name="username" type="text" label="username" />
            <MyTextInput name="email" type="text" label="email" />
            <MyTextInput name="password" type="password" label="password" />
            <MyTextInput
              name="passwordConfirm"
              type="password"
              label="confirm password"
            />
            {typeof error === "string" ? (
              <div className={styles.error_msg}>{error}</div>
            ) : (
              ""
            )}
          </div>
          <div></div>
          <div className={styles.action_btn}>
            <MyButton type="submit" disabled={isLoading}>
              SIGN-UP
            </MyButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default SignInForm;
