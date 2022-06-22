import Meta from "./meta";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Navbar from "./navbar";
import styles from "../styles/Layout.module.css";
import Footer from "./footer";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Loading from "./loading";

const Layout = ({ children }) => {
  const { t } = useTranslation("common");
  const { profile } = useContext(CurrentUserContext);
  const { status } = useSession();
  if (!profile && status === "unauthenticated")
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="underline text-2xl">{t("authenticated")}</h1>
          <button onClick={() => signIn()} className="bg-slate-400 mt-5">
            {t("login")}
          </button>
        </div>
      </>
    );
  else if (status === "loading" || !profile) {
    return <Loading />;
  }
  return (
    <>
      <Meta />
      <div className="flex flex-col h-screen justify-between">
        <Navbar />
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
