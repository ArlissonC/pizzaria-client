import { useFormik } from "formik";
import { schemaForm } from "./schema";
import { useAuth } from "@/contexts/AuthContext";

const useSignIn = () => {
  const { signIn } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaForm,
    onSubmit: (values) => {
      signIn(values);
    },
  });

  return {
    formik,
  };
};

export default useSignIn;
