import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import TemperatureData from "./temperatureData";
import HumidityData from "./humidityData";
import LightData from "./lightData";
import ShockData from "./shockData";
import deliveryDetailStyle from "../styles/deliveryDetail.module.css";
import { useRouter } from "next/router";

const DeliveryDetail = ({ deliveryDetail, access_token }) => {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });
  const [deliveriesLoc, setDeliveriesLoc] = useState([]);
  const router = useRouter();
  const getDeliveriesLocalisation = useCallback(() => {
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
  }, [access_token]);
  useEffect(() => {
    getDeliveriesLocalisation();
  }, [getDeliveriesLocalisation]);
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
        <ShockData />
        <LightData />
        <TemperatureData />
      </div>
      <div className={deliveryDetailStyle.map}>
        <MapWithNoSSR location={deliveriesLoc} deliveryId={deliveryDetail.id} />
      </div>
    </div>
  );
};

export default DeliveryDetail;
