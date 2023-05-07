import Header from "@/components/Header";
import React from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import { canSSRAuth } from "@/utils/canSSRAuth";
import useCategory from "../../hooks/useCategory";

export default function Category() {
  const { nameCategory, setNameCategory, handleRegisterCategory } =
    useCategory();

  return (
    <>
      <Head>
        <title>Pizzaria - Criar categoria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>

          <form className={styles.form} onSubmit={handleRegisterCategory}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
            />

            <button
              className={styles.buttonAdd}
              type="submit"
              disabled={nameCategory.length >= 2 ? false : true}
            >
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
