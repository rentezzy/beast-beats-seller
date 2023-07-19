import * as Yup from "yup";
export const textYup = (min: number, max: number) =>
  Yup.string()
    .min(min, `Min length is ${min} characters`)
    .max(max, `Max length is ${max} characters`);
export const emailYup = textYup(3, 32).email("Wrong email");
export const nameYup = textYup(3, 16).matches(
  /^[aA-zZ\s]+$/,
  "Only alphabets are allowed for this field"
);
export const usernameYup = textYup(3, 16).matches(
  /^[a-zA-Z0-9_.-]*$/,
  "Only alphabets and numbers are allowed for this field"
);
export const passwordYup = textYup(8, 32);
