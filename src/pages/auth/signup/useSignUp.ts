import { useFormik } from "formik";
import { schemaForm } from "./schema";
import { useAuth } from "@/contexts/AuthContext";

const useSignUp = () => {
  const { signUp } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schemaForm,
    onSubmit: (values) => {
      signUp(values);
    },
  });

  return {
    formik,
  };
};

export default useSignUp;
