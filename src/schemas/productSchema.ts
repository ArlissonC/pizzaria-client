import * as yup from "yup";

export const schemaProductForm = yup
  .object()
  .shape({
    category_id: yup.string().required("Categoria é obrigatório"),
    name: yup.string().required("Nome do produto é obrigatório"),
    description: yup.string().required("Descrição é obrigatório"),
    price: yup.string().required("Preço é obrigatório"),
  })
  .required();
