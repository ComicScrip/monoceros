import "../styles/globals.css";
import tokenContext from "../lib/tokenContext";
import { useState } from "react";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  const [contextTokens, setContextTokens] = useState({});
  return (
    <Layout>
      <tokenContext.Provider
        value={{
          contextTokens: contextTokens,
          setContextTokens: setContextTokens,
        }}
      >
        <Component {...pageProps} />;
      </tokenContext.Provider>
    </Layout>
  );
}

export default MyApp;
