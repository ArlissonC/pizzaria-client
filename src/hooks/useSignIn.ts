import { useFormik } from "formik";
import { useAuth } from "@/contexts/AuthContext";
import { schemaForm } from "@/schemas/signInSchema";

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
