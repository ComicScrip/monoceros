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
import { getSensorData } from "../lib/deliveriesAPI";
import { useTranslation } from "next-i18next";

const DeliveryOverview = ({ deliveryDetail, deliveries }) => {
  const { t } = useTranslation("deliveries");

  const MapWithNoSSR = dynamic(() => import("./map"), {
    ssr: false,
  });
  const [deliveriesLoc, setDeliveriesLoc] = useState([]);
  const [packages, setPackages] = useState({});
  const router = useRouter();
  const [sensorsData, setSensorsData] = useState([]);
  const sensorsType = ["temperature", "light", "shock", "humidity"];

  async function getData() {
    const allData = { temperature: [], light: [], shock: [], humidity: [] };
    for (let i = 0; i < packages.length; i++) {
      for (const datatype of sensorsType) {
        try {
          const data = await getSensorData(
            deliveryDetail.id,
            deliveryDetail.packages[i].id,
            datatype
          );
          allData[datatype].push(data[data.length - 1].sensor_value || 0);
        } catch {
          allData[datatype].push(null);
        }
      }
      setSensorsData(allData);
    }
  }

  useEffect(() => {
    setPackages(deliveryDetail.packages);
    getDeliveriesLocalisation().then(setDeliveriesLoc);
    getData();
  }, [deliveryDetail]);

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
          {t("details")}
        </button>
      </div>
      <p>{t("status")}</p>
      <div className={deliveryDetailStyle.data}>
        <HumidityData data={sensorsData.humidity} />
        <ShockData data={sensorsData.shock} />
        <LightData data={sensorsData.light} />
        <TemperatureData data={sensorsData.temperature} />
      </div>
      <div className={deliveryDetailStyle.map}>
        <MapWithNoSSR
          location={deliveriesLoc}
          deliveryId={deliveryDetail.id}
          deliveries={deliveries}
        />
      </div>
      <DeliveryPath id={deliveryDetail.id} />
    </div>
  );
};

export default DeliveryOverview;
