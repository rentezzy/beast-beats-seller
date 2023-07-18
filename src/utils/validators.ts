import * as Yup from "yup";

export const emailYup = Yup.string()
  .email("Wrong email")
  .min(3, "Min length is 3 characters")
  .max(32, "Max length is 32 characters");
export const nameYup = Yup.string()
  .min(3, "Min length is 3 characters")
  .max(16, "Max length is 16 characters")
  .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field");
export const usernameYup = Yup.string()
  .min(3, "Min length is 3 characters")
  .max(16, "Max length is 16 characters")
  .matches(
    /^[a-zA-Z0-9_.-]*$/,
    "Only alphabets and numbers are allowed for this field"
  );
export const passwordYup = Yup.string()
  .min(8, "Min length is 8 characters")
  .max(32, "Max length is 32 characters");
export const textYup = (min: number, max: number) =>
  Yup.string()
    .min(min, `Min length is ${min} characters`)
    .max(max, `Max length is ${max} characters`);
