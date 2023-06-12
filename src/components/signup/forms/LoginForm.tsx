import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MyButton, MyTextInput } from "../../ui/Controls";
import { usePostLoginMutation } from "../../../store/slices/authApi";
import styles from "./../Signup.module.css";

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

export default LoginForm;
