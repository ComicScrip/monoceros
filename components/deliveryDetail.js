import DeliveryLocalisation from "./deliveryLocalisation";
import axios from "axios";
import { useEffect, useState } from "react";
import TemperatureData from "./temperatureData";
import HumidityData from "./humidityData";
import LightData from "./lightData";
import ShockData from "./shockData";
import deliveryDetailStyle from "../styles/deliveryDetail.module.css";

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
    <div className={deliveryDetailStyle.global}>
      <h1 className={deliveryDetailStyle.head}>{deliveryDetail.id}</h1>
      <p>Delivery Status</p>
      <div className={deliveryDetailStyle.data}>
        <HumidityData />
        <ShockData />
        <LightData />
        <TemperatureData />
      </div>
      {deliveriesLoc.length !== 0 && (
        <DeliveryLocalisation
          deliveriesLoc={deliveriesLoc}
          deliveryId={deliveryDetail.id}
        />
      )}
    </div>
  );
};

export default DeliveryDetail;
