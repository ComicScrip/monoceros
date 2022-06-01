import "../styles/globals.css";
import DeliveryIdContextProvider from "../lib/deliveryIdContext";

function MyApp({ Component, pageProps }) {
  return (
    <DeliveryIdContextProvider>
      <Component {...pageProps} />
    </DeliveryIdContextProvider>
  );
}

export default MyApp;
