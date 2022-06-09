import Meta from "./meta";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Navbar from "./navbar";
import styles from "../styles/Layout.module.css";
import Footer from "./footer";
import { signIn } from "next-auth/react";

const Layout = ({ children }) => {
  const { profile, status } = useContext(CurrentUserContext);
  if (status === "loading") return "loading...";
  if (!profile)
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="underline text-2xl">you are not authenticated</h1>
          <button onClick={() => signIn()} className="bg-slate-400 mt-5">
            Login Page
          </button>
        </div>
      </>
    );
  return (
    <>
      <Meta />
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
