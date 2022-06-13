import { SessionProvider } from "next-auth/react";
import CurrentUserContextProvider from "../contexts/currentUserContext";
import "../styles/globals.css";
import LoadingScreen from "../components/loadingScreen";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      setLoading(true);
    };
    const handleStop = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <LoadingScreen />
      <SessionProvider>
        <CurrentUserContextProvider>
          <Component {...pageProps} />
        </CurrentUserContextProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
