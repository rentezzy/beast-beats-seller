import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useGetMeQuery } from "../../../store/slices/api/authApi";

import styles from "../Profile.module.css";
import LoadingElement from "../../ui/LoadingElement";
import { FileInput, MyTextInput } from "../../ui/Controls";
import { useUpdateUserInfoMutation } from "../../../store/slices/api/userApi";

const Settings = () => {
  const { data } = useGetMeQuery(null);
  const [update] = useUpdateUserInfoMutation();
  if (!data) return <LoadingElement />;

  return (
    <div>
      <Formik
        initialValues={{ name: data.name, email: data.email, photo: [] }}
        onSubmit={(values) => {
          update(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Min length is 3 characters")
            .max(16, "Max length is 16 characters")
            .matches(
              /^[aA-zZ\s]+$/,
              "Only alphabets are allowed for this field"
            ),
          email: Yup.string()
            .email("Wrong email")
            .min(3, "Min length is 3 characters")
            .max(32, "Max length is 32 characters"),
          photo: Yup.array().max(1, "only 1 file is avaliable"),
        })}
      >
        <Form>
          <MyTextInput name="email" type="text" label="email" />
          <MyTextInput name="name" type="text" label="name" />
          <FileInput name="photo" />
          <button type="submit">aboba</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
