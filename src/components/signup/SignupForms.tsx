import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MyButton, MyTextInput } from "../ui/Controls";
import { usePostLoginMutation } from "./../../store/slices/authApi";
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
            .max(32, "Max length is 32 characters")
            .required(),
          password: Yup.string()
            .max(32, "Max length is 32 characters")
            .required(),
        })}
      >
        <Form className={styles.form__controls}>
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
            .max(32, "Max length is 32 characters")
            .required(),
          password: Yup.string()
            .max(32, "Max length is 32 characters")
            .required(),
        })}
      >
        <Form className={styles.form__controls}>
          <MyTextInput name="Username" type="text" label="username" />
          <MyTextInput name="Password" type="password" label="password" />
          <div className={styles.action_btn}>
            <MyButton type="submit">SIGN-UP</MyButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
// name: req.body.name,
// username: req.body.username,
// avatar: req.body.avatar,
// email: req.body.email,
// password: req.body.password,
// passwordConfirm: req.body.passwordConfirm,
