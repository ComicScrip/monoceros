import styles from "../styles/home.module.css";
import LoginForm from "../components/loginForm";
import headLogo from "../public/images/logo-monoceros2.png";
import Meta from "../components/meta";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Meta pagetitle={"monoceros"} />
      <main className={styles.main}>
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    </>
  );
}
