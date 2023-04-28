import * as yup from "yup";

export const schemaForm = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("Digite um e-mail válido"),
    password: yup.string().required("Senha é obrigatório"),
  })
  .required();
