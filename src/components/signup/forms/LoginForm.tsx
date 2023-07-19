import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../../store/slices/api/authApi";

import styles from "./../Signup.module.css";
import { MyButton, MyTextInput } from "../../ui/Controls";
import { passwordYup, usernameYup } from "../../../utils/validators";

const LoginForm = () => {
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
          username: usernameYup.required(),
          password: passwordYup.required(),
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

export default LoginForm;
