import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TemperatureData from "./temperatureData";
import HumidityData from "./humidityData";
import LightData from "./lightData";
import ShockData from "./shockData";
import deliveryDetailStyle from "../styles/deliveryDetail.module.css";
import { useRouter } from "next/router";
import { getDeliveriesLocalisation } from "../lib/sensorDataAPI";
import { useTranslation } from "next-i18next";

const DeliveryOverview = ({ deliveryDetail }) => {
  const { t } = useTranslation("deliveries");
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
          {t("details")}
        </button>
      </div>
      <p>{t("status")}</p>
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

export default DeliveryOverview;
