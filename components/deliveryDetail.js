import DeliveryLocalisation from "./deliveryLocalisation";
import axios from "axios";
import { useEffect, useState } from "react";

const DeliveryDetail = ({ deliveryDetail, access_token }) => {
  const [deliveriesLoc, setDeliveriesLoc] = useState([]);
  function getDeliveriesLocalisation() {
    axios
      .get(
        "https://devbackend.monoceros-sas.com/api/deliveries/delivery-location/",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => setDeliveriesLoc(res.data));
  }
  useEffect(() => {
    getDeliveriesLocalisation();
  });
  return (
    <div>
      <div>{deliveryDetail.id}</div>
      {deliveryDetail.packages.map((colis) => (
        <div key={colis.id}>{colis.id}</div>
      ))}
      {deliveriesLoc && (
        <DeliveryLocalisation
          deliveriesLoc={deliveriesLoc}
          deliveryId={deliveryDetail.id}
        />
      )}
    </div>
  );
};

export default DeliveryDetail;
