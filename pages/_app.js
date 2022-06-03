import { SessionProvider } from "next-auth/react";
import CurrentUserContextProvider from "../contexts/currentUserContext";
import "../styles/globals.css";

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
