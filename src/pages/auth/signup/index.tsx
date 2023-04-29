import Head from "next/head";
import styles from "@/styles/home.module.scss";
import logoImg from "../../../../public/logo.svg";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import useSignUp from "./useSignUp";
import { useAuth } from "@/contexts/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function SignUp() {
  const { formik } = useSignUp();
  const { loading } = useAuth();

  const { errors, setFieldValue, values, handleSubmit } = formik;

  return (
    <>
      <Head>
        <title>Pizzaria - Cadastre-se</title>
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logoImg} alt="Logotipo Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Nome"
              type="text"
              value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
              errors={errors.name}
            />
            <Input
              placeholder="Digite seu e-mail"
              type="text"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              errors={errors.email}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={values.password}
              onChange={(e) => setFieldValue("password", e.target.value)}
              errors={errors.password}
            />
            <Button loading={loading}>Cadastrar</Button>
          </form>
          <Link href="signin" className={styles.text}>
            Já possui conta? Entrar
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
