import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useChangePasswordMutation } from "../../../store/slices/api/authApi";
import styles from "../Profile.module.css";
import { MyButton, MyTextInput } from "../../ui/Controls";
import { IPasswordBody } from "../../../types/auth.types";

const SecurityPasswordForm = () => {
  const [changePassword, { error, isSuccess, reset }] =
    useChangePasswordMutation();

  const onError =
    typeof error === "string" ? (
      <div className={styles.error}>{error}</div>
    ) : (
      ""
    );

  const onSuccess = isSuccess ? (
    <div className={styles.error}>Success</div>
  ) : (
    ""
  );
  const initialValues: IPasswordBody = {
    password: "",
    passwordConfirm: "",
    passwordCurrent: "",
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setValues, resetForm }) => {
          changePassword(values);
          if (isSuccess) {
            resetForm();
            reset();
          }
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, "Min length is 8 characters")
            .max(32, "Max length is 32 characters")
            .required(),
          passwordConfirm: Yup.string()
            .min(8, "Min length is 8 characters")
            .max(32, "Max length is 32 characters")
            .required(),
          passwordCurrent: Yup.string()
            .min(8, "Min length is 8 characters")
            .max(32, "Max length is 32 characters")
            .required(),
        })}
      >
        <Form>
          <div>
            <MyTextInput
              name="passwordCurrent"
              type="password"
              label="Current password"
            />
            <MyTextInput name="password" type="password" label="New password" />
            <MyTextInput
              name="passwordConfirm"
              type="password"
              label="new password confirm"
            />
            {onError}
            {onSuccess}
          </div>
          <div>
            <MyButton type="submit">Change Password</MyButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SecurityPasswordForm;
