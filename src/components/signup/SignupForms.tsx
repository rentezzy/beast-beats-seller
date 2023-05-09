import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MyButton, MyTextInput } from "../ui/Controls";
import {
  usePostLoginMutation,
  usePostSignupMutation,
} from "./../../store/slices/authApi";
import styles from "./Signup.module.css";

export const LoginForm = () => {
  const [login, { error, isLoading, isSuccess }] = usePostLoginMutation();
  const navigate = useNavigate();
  if (isSuccess) {
    navigate("/home");
  }
  return (
    <div className={styles.form}>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          login({ password: values.password, username: values.username });
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Min length is 3 characters")
            .max(16, "Max length is 16 characters")
            .required(),
          password: Yup.string()
            .min(8, "Min length is 8 characters")
            .max(32, "Max length is 32 characters")
            .required(),
        })}
      >
        <Form className={styles.form__controls_login}>
          <div></div>
          <div>
            <MyTextInput name="username" type="text" label="username" />
            <MyTextInput name="password" type="password" label="password" />
            {typeof error === "string" ? (
              <div className={styles.error_msg}>{error}</div>
            ) : (
              ""
            )}
          </div>
          <div></div>
          <div className={styles.action_btn}>
            <MyButton type="submit" disabled={isLoading}>
              LOG-IN
            </MyButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export const SignInForm = () => {
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
          name: Yup.string()
            .min(3, "Min length is 3 characters")
            .max(16, "Max length is 16 characters")
            .matches(
              /^[aA-zZ\s]+$/,
              "Only alphabets are allowed for this field"
            )
            .required(),
          username: Yup.string()
            .min(3, "Min length is 3 characters")
            .max(16, "Max length is 16 characters")
            .matches(
              /^[a-zA-Z0-9_.-]*$/,
              "Only alphabets and numbers are allowed for this field"
            )
            .required(),
          email: Yup.string()
            .email("Wrong email")
            .min(3, "Min length is 3 characters")
            .max(32, "Max length is 32 characters")
            .required(),
          password: Yup.string()
            .min(8, "Min length is 8 characters")
            .max(32, "Max length is 32 characters")
            .required(),
          passwordConfirm: Yup.string()
            .min(8, "Min length is 8 characters")
            .max(32, "Max length is 32 characters")
            .required("password confirm is a required field"),
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
// name: req.body.name,
// username: req.body.username,
// email: req.body.email,
// password: req.body.password,
// passwordConfirm: req.body.passwordConfirm,
