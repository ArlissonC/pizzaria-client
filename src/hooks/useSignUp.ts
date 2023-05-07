import { useFormik } from "formik";
import { useAuth } from "@/contexts/AuthContext";
import { schemaForm } from "@/schemas/signUpSchema";

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
