import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./styles.module.scss";
import { FormikErrors } from "formik";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FormikErrors<string>;
}

export const Input = ({ errors, ...rest }: InputProps) => {
  return (
    <label>
      <input type="text" className={styles.input} {...rest} />
      {errors && <p className={styles.error}>{errors}</p>}
    </label>
  );
};

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errors?: FormikErrors<string>;
}

export const TextArea = ({ errors, ...rest }: TextAreaProps) => {
  return (
    <label>
      <textarea className={styles.input} {...rest}></textarea>
      {errors && <p className={styles.error}>{errors}</p>}
    </label>
  );
};
