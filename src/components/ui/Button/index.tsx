import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

const Button = ({ children, loading, ...rest }: ButtonProps) => {
  return (
    <button disabled={loading} className={styles.button} {...rest}>
      {loading ? (
        <FaSpinner color="#fff" size={16} />
      ) : (
        <p className={styles.buttonText}>{children}</p>
      )}
    </button>
  );
};

export default Button;
