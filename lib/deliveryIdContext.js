import { createContext, useState } from "react";

export const DeliveryIdContext = createContext();

function DeliveryIdContextProvider({ children }) {
  const [deliveryId, setDeliveryId] = useState("");
  const idContext = { deliveryId, setDeliveryId };
  return (
    <DeliveryIdContext.Provider value={idContext}>
      {children}
    </DeliveryIdContext.Provider>
  );
}

export default DeliveryIdContextProvider;
