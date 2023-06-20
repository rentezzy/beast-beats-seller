import { Formik } from "formik";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import { MyButton, MyTextInput } from "../ui/Controls";

const FilterForm = () => {
  return (
    <div className={"hi"}>
      <Formik
        initialValues={{ genre: "", author: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          genre: Yup.string(),
          author: Yup.string(),
        })}
      >
        <Form className={""}>
          <div>
            <MyTextInput name="genre" type="text" label="genre" />
            <MyTextInput name="author" type="password" label="author" />
          </div>
          <div className={""}>
            <MyButton type="submit">SEARCH</MyButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FilterForm;
