import { useField } from "formik";
import styles from "./ui.module.css";
import { ReactNode, useRef, MouseEvent } from "react";
import { IControlProps, IRangeProps } from "../../types/ui.types";

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
      <select {...field} {...props}>
        {props.children}
      </select>
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
      <button {...props} className={`${styles.controls__button} noselectText`}>
        {props.children}
      </button>
    </div>
  );
};

export const Checkbox: React.FC<{ label?: string; name: string }> = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.controls__checkbox}>
      {props.label}
      <label className={styles.controls__checkbox__container}>
        <input
          type="checkbox"
          id={props.name}
          {...field}
          checked={meta.value}
        />
        <span className={styles.controls__checkbox__checkmark}></span>
      </label>
    </div>
  );
};

export const MyRange = (props: IRangeProps) => {
  const [fieldFrom, , helperFrom] = useField(props.nameFrom);
  const [fieldTo, metaTo, helperTo] = useField(props.nameTo);
  const refRange = useRef<HTMLDivElement>(null);
  const refLeft = useRef<HTMLDivElement>(null);
  const refRight = useRef<HTMLDivElement>(null);

  const onMouseDown =
    (
      element: "left" | "right",
      refLeft: React.RefObject<HTMLDivElement> | null,
      refRange: React.RefObject<HTMLDivElement> | null,
      refRight: React.RefObject<HTMLDivElement> | null
    ) =>
    (event: MouseEvent<HTMLDivElement>) => {
      if (
        !refLeft ||
        !refLeft.current ||
        !refRange ||
        !refRange.current ||
        !refRight ||
        !refRight.current
      )
        return;
      const offsetLeft = refRange.current.offsetLeft;
      const width = refRange.current.offsetWidth;

      let min: number;
      let max: number;
      let left: number;
      let onMouseMove: (event: any) => void;

      if (element === "left") {
        min = offsetLeft;
        max = refRight.current.offsetLeft - refRight.current.offsetWidth;
        left = 0;
        onMouseMove = (event: any) => {
          if (!refLeft || !refLeft.current) return;
          if (event.pageX >= min) left = event.pageX - min;
          if (event.pageX - min > max) left = max;
          refLeft.current.style.left = left + "px";
          helperFrom.setValue(Math.ceil((left / width) * metaTo.initialValue));
        };
      } else {
        min = refLeft.current.offsetLeft + refLeft.current.offsetWidth;
        max = offsetLeft + width;
        left = min;
        onMouseMove = (event: any) => {
          if (!refRight || !refRight.current) return;
          if (event.pageX - offsetLeft > min) left = event.pageX - offsetLeft;
          if (event.pageX + refRight.current.offsetWidth > max)
            left = width - refRight.current.offsetWidth;
          refRight.current.style.left = left + "px";
          helperTo.setValue(
            Math.ceil(
              ((left + refRight.current.offsetWidth) / width) *
                metaTo.initialValue
            )
          );
        };
      }

      document.addEventListener("mousemove", onMouseMove);

      document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
      };
    };
  return (
    <div className={styles.controls__block}>
      <label>{props.label}</label>
      <div className={styles.controls__range} ref={refRange}>
        <div
          className={styles.controls__range__from}
          ref={refLeft}
          onMouseDown={onMouseDown("left", refLeft, refRange, refRight)}
        ></div>
        <div
          className={styles.controls__range__to}
          ref={refRight}
          onMouseDown={onMouseDown("right", refLeft, refRange, refRight)}
        ></div>
      </div>
      <div className={styles.conrtols__range__inputs}>
        <div>
          <label className="noselectText">
            {props.labelFrom} {fieldFrom.value} $
          </label>
          <input type="hidden" {...fieldFrom} name={props.nameFrom} />
        </div>
        <div>
          <label className="noselectText">
            {props.labelTo} {fieldTo.value} $
          </label>
          <input type="hidden" {...fieldTo} name={props.nameTo} />
        </div>
      </div>
    </div>
  );
};
