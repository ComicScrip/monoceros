import Meta from "./meta";
import Navbar from "./navbar";
import styles from "../styles/Layout.module.css";
import Footer from "./footer";

const Layout = ({ children }) => {
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
