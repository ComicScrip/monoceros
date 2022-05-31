import "../styles/globals.css";
import tokenContext from "../lib/tokenContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [tokens, setTokens] = useState({});

  return (
    <tokenContext.Provider value={{ tokens: tokens, setTokens: setTokens }}>
      <Component {...pageProps} />;
    </tokenContext.Provider>
  );
}

export default MyApp;
