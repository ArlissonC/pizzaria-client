import { SelectHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { FormikErrors } from "formik";

type Option = {
  label: string;
  value: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  errors?: FormikErrors<string>;
}

const Select = ({ options, errors, ...rest }: SelectProps) => {
  return (
    <label>
      <select {...rest}>
        <option value="" disabled label="Selecione"></option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors && <p className={styles.error}>{errors}</p>}
    </label>
  );
};

export default Select;
