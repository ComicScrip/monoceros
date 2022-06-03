import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import CurrentUserContextProvider from "../contexts/currentUserContext";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <CurrentUserContextProvider>
        <Component {...pageProps} />;
      </CurrentUserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
