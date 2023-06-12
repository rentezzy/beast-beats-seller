import { useField } from "formik";
import styles from "./Ui.module.css";
import { ReactNode } from "react";
import { IControlProps } from "../../types/ui.types";

export const MyTextInput = (props: IControlProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.controls__block}>
      <label>{props.label}</label>
      <input
        className={`${styles.controls__input} ${
          meta.touched && meta.error ? styles.controls__input_error : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.controls__error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyCheckbox = (props: IControlProps) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className={styles.controls__block}>
      <label className="checkbox-input">props.label</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.controls__error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MySelect = (props: IControlProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.controls__block}>
      <label>{props.label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.controls__error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyButton: React.FC<
  Record<string, unknown> & { children: ReactNode }
> = (props) => {
  return (
    <div className={styles.controls__button_block}>
      <button {...props} className={styles.controls__button}>
        {props.children}
      </button>
    </div>
  );
};
