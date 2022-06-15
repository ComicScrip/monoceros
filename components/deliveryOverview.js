import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TemperatureData from "./temperatureData";
import HumidityData from "./humidityData";
import LightData from "./lightData";
import ShockData from "./shockData";
import deliveryDetailStyle from "../styles/deliveryDetail.module.css";
import { useRouter } from "next/router";
import { getDeliveriesLocalisation } from "../lib/sensorDataAPI";

const DeliveryOverview = ({ deliveryDetail }) => {
  const MapWithNoSSR = dynamic(() => import("./map"), {
    ssr: false,
  });
  const [deliveriesLoc, setDeliveriesLoc] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getDeliveriesLocalisation().then(setDeliveriesLoc);
  }, []);
  return (
    <div className={deliveryDetailStyle.global}>
      <div className={deliveryDetailStyle.head}>
        <h1 className={deliveryDetailStyle.title} data-cy="deliveryDetailTitle">
          {deliveryDetail.id}
        </h1>
        <button
          type="button"
          className={deliveryDetailStyle.detailBtn}
          data-cy="deliveryDetailBtn"
          onClick={() => {
            router.push({
              pathname: "/deliveries/[delivery_id]",
              query: { delivery_id: deliveryDetail.id },
            });
          }}
        >
          Details
        </button>
      </div>
      <p>Delivery Status</p>
      <div className={deliveryDetailStyle.data}>
        <HumidityData data-cy="deliveryDetailHumidity" />
        <ShockData data-cy="deliveryDetailShock" />
        <LightData data-cy="deliveryDetailLight" />
        <TemperatureData data-cy="deliveryDetailTemperature" />
      </div>
      <div className={deliveryDetailStyle.map}>
        <MapWithNoSSR
          location={deliveriesLoc}
          deliveryId={deliveryDetail.id}
          data-cy="deliveryDetailMap"
        />
      </div>
    </div>
  );
};

export default DeliveryOverview;
