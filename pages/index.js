import styles from "../styles/home.module.css";
import LoginForm from "../components/loginForm";
import headLogo from "../public/images/logo-monoceros2.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <Image src={headLogo} alt="head-logo" width="200px" height="100px" />
      </header>
      <div className={styles.loginContainer}>
        <LoginForm />
      </div>
    </main>
  );
}
