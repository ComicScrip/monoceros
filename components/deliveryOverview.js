import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TemperatureData from "./temperatureData";
import HumidityData from "./humidityData";
import LightData from "./lightData";
import ShockData from "./shockData";
import deliveryDetailStyle from "../styles/deliveryDetail.module.css";
import { useRouter } from "next/router";
import { getDeliveriesLocalisation } from "../lib/sensorDataAPI";
import DeliveryPath from "./deliveryPath";

const DeliveryOverview = ({ deliveryDetail }) => {
  const MapWithNoSSR = dynamic(() => import("./map"), {
    ssr: false,
  });
  const [deliveriesLoc, setDeliveriesLoc] = useState([]);
  const [packages, setPackages] = useState({});
  const router = useRouter();
  useEffect(() => {
    setPackages(deliveryDetail.packages);
    getDeliveriesLocalisation().then(setDeliveriesLoc);
  }, [deliveryDetail]);

  return (
    <div className={deliveryDetailStyle.global}>
      <div className={deliveryDetailStyle.head}>
        <h1 className={deliveryDetailStyle.title}>{deliveryDetail.id}</h1>
        <button
          type="button"
          className={deliveryDetailStyle.detailBtn}
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
        <HumidityData />
        <ShockData deliveryId={deliveryDetail.id} packages={packages} />
        <LightData />
        <TemperatureData />
      </div>
      <div className={deliveryDetailStyle.map}>
        <MapWithNoSSR location={deliveriesLoc} deliveryId={deliveryDetail.id} />
      </div>
      <DeliveryPath id={deliveryDetail.id} />
    </div>
  );
};

export default DeliveryOverview;
