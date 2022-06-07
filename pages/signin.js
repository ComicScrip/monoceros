import { getCsrfToken, useSession } from "next-auth/react";
import style from "../styles/home.module.css";
import styles from "../styles/loginForm.module.css";
import headLogo from "../public/images/logo-monoceros2.png";
import Meta from "../components/meta";
import Image from "next/image";
import LogoForm from "../public/images/logo-monoceros.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Signin({ csrfToken }) {
  useEffect(() => {
    console.log(status);
  });
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginIssues, setLoginIssues] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  async function handleSubmit(e) {
    console.log(status);
    if (status === "authenticated") {
      router.push("/deliveries");
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
    <>
      <Meta pagetitle={"monoceros"} />
      <main className={style.main}>
        <header>
          <Image src={headLogo} alt="head-logo" width="200px" height="100px" />
        </header>
        <div className={style.loginContainer}>
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
                  onSubmit={(e) => handleSubmit(e)}
                  method="post"
                  action="/api/auth/callback/credentials"
                  data-cy="loginForm"
                  className={styles.formContent}
                  id="loginForm"
                >
                  <input
                    name="csrfToken"
                    defaultValue={csrfToken}
                    type="hidden"
                  />
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={(e) => handleEmailChange(e)}
                      data-cy="email"
                      type="email"
                      value={email}
                      className={styles.input}
                      id="email"
                      name="username"
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
                      name="password"
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
        </div>
      </main>
    </>
  );
}

const getCsrfTokenAndSetCookies = async ({ res, query }) => {
  // to make it work on Vercel
  let baseUrl = process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
  console.log(baseUrl);
  // capturing the callback url if any, which should include the current domain for security ?
  const callbackUrlIsPresent = typeof query?.callbackUrl === "string";
  const callbackUrlIsValid =
    callbackUrlIsPresent && query?.callbackUrl.startsWith(baseUrl);
  const host = callbackUrlIsValid ? query?.callbackUrl : baseUrl;
  const redirectURL = encodeURIComponent(host);
  // getting both the csrf form token and (next-auth.csrf-token cookie + next-auth.callback-url cookie)
  const csrfUrl = `${baseUrl}/api/auth/csrf?callbackUrl=${redirectURL}`;
  const csrfResponse = await fetch(csrfUrl);
  const { csrfToken } = await csrfResponse.json();
  const { headers } = csrfResponse;
  // placing the cookies
  const [csrfCookie, redirectCookie] = headers.get("set-cookie").split(",");
  res.setHeader("set-cookie", [csrfCookie, redirectCookie]);
  // placing form csrf token
  return csrfToken;
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfTokenAndSetCookies(context),
    },
  };
}