import Meta from "./meta";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import Navbar from "./navbar";
import styles from "../styles/Layout.module.css";
import Footer from "./footer";

const Layout = ({ children }) => {
  const { profile } = useContext(CurrentUserContext);
  if (!profile) return "loading";
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
