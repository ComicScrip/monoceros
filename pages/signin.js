import { getProviders } from "next-auth/react";
import styles from "../styles/home.module.css";
import LoginForm from "../components/loginForm";
import headLogo from "../public/images/logo-monoceros2.png";
import Meta from "../components/meta";
import Image from "next/image";

export default function Signin() {
  return (
    <>
      <Meta pagetitle={"monoceros"} />
      <main className={styles.main}>
        <header>
          <Image src={headLogo} alt="head-logo" width="200px" height="100px" />
        </header>
        <div className={styles.loginContainer}>
          <LoginForm />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
