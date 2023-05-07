import Header from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { FiUpload } from "react-icons/fi";
import { categoryService } from "@/services/category";
import { Input, TextArea } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import useProduct from "../../hooks/useProduct";

type ItemProps = {
  id: string;
  name: string;
};

interface CategoriesProps {
  categoriesList: ItemProps[];
}

const Product = ({ categoriesList }: CategoriesProps) => {
  const [categories] = useState(categoriesList);
  const { avatarUrl, handleFile, formik } = useProduct();
  const { setFieldValue, errors, values, handleSubmit } = formik;

  return (
    <>
      <Head>
        <title>Pizzaria - novo produto</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <Select
              value={values.category_id}
              onChange={(e) => setFieldValue("category_id", e.target.value)}
              errors={errors.category_id}
              options={categories.map(({ id, name }) => {
                return {
                  label: name,
                  value: id,
                };
              })}
            />
            <Input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={values.name}
              errors={errors.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
              value={values.price}
              errors={errors.price}
              onChange={(e) => setFieldValue("price", e.target.value)}
            />
            <TextArea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={values.description}
              errors={errors.description}
              onChange={(e) => setFieldValue("description", e.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const data = await categoryService.listCategories(ctx);

  return {
    props: {
      categoriesList: data,
    },
  };
});

export default Product;
