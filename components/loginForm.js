import { useState } from "react";
import styles from "../styles/loginForm.module.css";
import Image from "next/image";
import LogoForm from "../public/images/logo-monoceros.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginIssues, setLoginIssues] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!loginIssues) {
      router.push("/inProgress");
    }
  }

  function handleCheckBox() {
    setIsChecked(!isChecked);
  }

  function handleEmailChange(e) {
    setLoginIssues(false);
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setLoginIssues(false);
    setPassword(e.target.value);
  }

  return (
    <div className="flex flex-col items-center">
      <div className={styles.loginContainer}>
        <div className="flex flex-col items-center">
          <div className="flex justify-center mt-5">
            <Image
              className={styles.logoForm}
              src={LogoForm}
              alt="logo-form"
              width={60}
              height={60}
            />
          </div>
          <form
            data-cy="loginForm"
            onSubmit={(e) => handleSubmit(e)}
            className={styles.formContent}
            id="loginForm"
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => handleEmailChange(e)}
                data-cy="email"
                type="email"
                value={email}
                className={styles.input}
                id="email"
                placeholder=""
                required
              />
            </div>
            <div className="flex flex-col">
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                className={styles.input}
                data-cy="password"
                type="password"
                id="password"
                required
              />
            </div>
            <p>
              <input
                data-cy="rememberBox"
                onChange={handleCheckBox}
                value={isChecked}
                type="checkbox"
                id="remember"
              />
              <label htmlFor="remember"> Remember me</label>
            </p>
            <button
              type="submit"
              form="loginForm"
              data-cy="loginBtn"
              className={styles.formButton}
            >
              Login
            </button>
            <Link href={"/inProgress"}>
              <p data-cy="lostPassword" className={styles.lostPassword}>
                Lost your password ?
              </p>
            </Link>
          </form>
        </div>
      </div>
      {loginIssues ? (
        <div className={styles.loginIssues}>
          <p>wrong credential(s)</p>
        </div>
      ) : null}
    </div>
  );
}
