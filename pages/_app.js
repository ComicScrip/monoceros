import "../styles/globals.css";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import CurrentUserContextProvider from "../contexts/currentUserContext";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <CurrentUserContextProvider>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </CurrentUserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
