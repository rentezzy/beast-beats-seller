import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import styles from "../Song.module.css";
import { Checkbox, MyButton, MyTextInput } from "../../ui/Controls";
import { useCreateNewMusicCommentMutation } from "../../../store/slices/api/musicApi";

interface IProps {
  musicID: string;
  getTimestamp: () => number;
}
// TODO: Timestamp function( via react context or hooks or forward ref from wavesurfer...)

const SongForm: React.FC<IProps> = ({ getTimestamp, musicID }) => {
  const [newComment, data] = useCreateNewMusicCommentMutation();

  return (
    <div className={styles.song__form}>
      <Formik
        initialValues={{ text: "", timestamp: true }}
        onSubmit={(values, { resetForm }) => {
          newComment({
            text: values.text,
            timestamp: values.timestamp ? getTimestamp() : 0,
            originTo: musicID,
          });
          resetForm({ values: { text: "", timestamp: values.timestamp } });
        }}
        validationSchema={Yup.object({
          text: Yup.string()
            .min(3, "Min length is 3 characters")
            .max(300, "Max length is 300 characters")
            .required("Commentary text is required"),
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
