import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateArtistPostsMutation,
  useCreateArtistPostsReplyMutation,
} from "../../../store/slices/api/artistsApi";

import styles from "../Artist.module.css";
import { MyButton, MyTextInput } from "../../ui/Controls";

export const ArtistPostControls = () => {
  const [newPost, data] = useCreateArtistPostsMutation();

  return (
    <div className={styles.artist__createPost}>
      <ArtistForm
        buttonText="Create new Post"
        isLoading={data.isLoading}
        onSubmit={newPost}
      />
    </div>
  );
};

interface IReplyProps {
  postId: string;
  replyTo?: string;
}
export const ArtistReplyControls: React.FC<IReplyProps> = ({
  postId,
  replyTo,
}) => {
  const [newPost, data] = useCreateArtistPostsReplyMutation();
  const newPostHandler = (postId: string, replyTo?: string) => {
    return (text: string) => newPost({ postId, replyTo, text });
  };
  return (
    <div>
      <ArtistForm
        buttonText="Reply"
        isLoading={data.isLoading}
        onSubmit={newPostHandler(postId, replyTo)}
      />
    </div>
  );
};

interface IFormProps {
  onSubmit: (payload: string) => void;
  buttonText: string;
  isLoading: boolean;
}
const ArtistForm: React.FC<IFormProps> = ({
  onSubmit,
  buttonText,
  isLoading,
}) => {
  return (
    <Formik
      initialValues={{ text: "" }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.text);
        resetForm({ values: { text: "" } });
      }}
      validationSchema={Yup.object({
        text: Yup.string()
          .min(3, "Min length is 3 characters")
          .max(800, "Max length is 300 characters")
          .required("Commentary text is required"),
      })}
    >
      <Form>
        <div className={styles.artist__form_comment}>
          <div className={styles.artist__form__form__input}>
            <MyTextInput name="text" type="textarea" />
          </div>
          <div className={styles.artist__form__form__buttons}>
            <MyButton type="submit" disabled={isLoading}>
              {buttonText}
            </MyButton>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
