import "../styles/globals.css";
import tokenContext from "../lib/tokenContext";
import { useState } from "react";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  const [tokens, setTokens] = useState({});

  return (
    <Layout>
      <tokenContext.Provider value={{ tokens: tokens, setTokens: setTokens }}>
        <Component {...pageProps} />;
      </tokenContext.Provider>
    </Layout>
  );
}

export default MyApp;
