import "../styles/globals.css";
import Layout from "../components/layout";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
