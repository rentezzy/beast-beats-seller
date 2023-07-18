import * as Yup from "yup";
import { Form, Formik } from "formik";

import { useNavigate } from "react-router-dom";
import { useCreateNewMusicCommentMutation } from "../../../store/slices/api/musicApi";
import { useAppSelector } from "../../../store/hooks";

import styles from "../Song.module.css";
import { Checkbox, MyButton, MyTextInput } from "../../ui/Controls";
import { SeekProps } from "../../../types/home.types";
import { textYup } from "../../../utils/validators";

interface IProps {
  musicID: string;
  seek: SeekProps;
}

const SongForm: React.FC<IProps> = ({ seek, musicID }) => {
  const isLogined = useAppSelector((state) => state.appState.isLogined);
  const navigate = useNavigate();
  const [newComment, data] = useCreateNewMusicCommentMutation();

  return (
    <div className={styles.song__form}>
      <Formik
        initialValues={{ text: "", timestamp: true }}
        onSubmit={(values, { resetForm }) => {
          if (isLogined) {
            newComment({
              text: values.text,
              timestamp: values.timestamp ? Math.round(seek.current.get()) : 0,
              originTo: musicID,
            });
            resetForm({ values: { text: "", timestamp: values.timestamp } });
          } else {
            navigate("/signup");
          }
        }}
        validationSchema={Yup.object({
          text: textYup(3, 300).required("Commentary text is required"),
          timestamp: Yup.boolean().required(),
        })}
      >
        <Form>
          <div className={styles.song__form_comment}>
            <div className={styles.song__form__input}>
              <MyTextInput name="text" type="textarea" label="comment" />
            </div>
            <div className={styles.song__form__buttons}>
              <Checkbox name="timestamp" label="time?" />
              <MyButton type="submit" disabled={data.isLoading}>
                Send
              </MyButton>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SongForm;
