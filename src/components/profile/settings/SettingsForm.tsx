import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useGetMeQuery } from "../../../store/slices/api/authApi";
import { useUpdateUserInfoMutation } from "../../../store/slices/api/userApi";

import styles from "../Profile.module.css";
import LoadingElement from "../../ui/LoadingElement";
import { FileInput, MyButton, MyTextInput } from "../../ui/Controls";
import { emailYup, nameYup } from "../../../utils/validators";

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
          name: nameYup,
          email: emailYup,
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
