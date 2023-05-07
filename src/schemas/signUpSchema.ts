import * as yup from "yup";

export const schemaForm = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "revise estes dados")
      .trim()
      .required("Nome é obrigatório")
      .min(3, "Insira no mínimo 3 caracteres"),
    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("Digite um e-mail válido"),
    password: yup.string().required("Senha é obrigatório"),
  })
  .required();
