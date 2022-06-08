import { SessionProvider } from "next-auth/react";
import CurrentUserContextProvider from "../contexts/currentUserContext";
import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <CurrentUserContextProvider>
        <Component {...pageProps} />
      </CurrentUserContextProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
