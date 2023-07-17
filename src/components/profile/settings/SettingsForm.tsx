import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useGetMeQuery } from "../../../store/slices/api/authApi";
import { useUpdateUserInfoMutation } from "../../../store/slices/api/userApi";

import styles from "../Profile.module.css";
import LoadingElement from "../../ui/LoadingElement";
import { FileInput, MyButton, MyTextInput } from "../../ui/Controls";

interface IValues {
  name: string;
  email: string;
  photo: File[];
}

const SettingsForm = () => {
  const { data } = useGetMeQuery(null);
  const [update] = useUpdateUserInfoMutation();
  if (!data) return <LoadingElement />;

  const onSubmit = (values: IValues) => {
    const res: Partial<typeof values> = {};
    if (values.email !== data.email) res.email = values.email;
    if (values.name !== data.name) res.name = values.name;
    if (values.photo.length === 1) res.photo = values.photo;
    update(res);
  };

  return (
    <div className={styles.profile__settings__form}>
      <Formik
        initialValues={{ name: data.name, email: data.email, photo: [] }}
        onSubmit={onSubmit}
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
        <Form className={styles.profile__settings__btns}>
          <div>
            <MyTextInput name="email" type="text" label="email" />
            <MyTextInput name="name" type="text" label="name" />
          </div>
          <FileInput name="photo" />
          <div>
            <MyButton type="submit">Save Settings</MyButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SettingsForm;
