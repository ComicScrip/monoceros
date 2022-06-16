import { useEffect, useState } from "react";
import { getSensorData } from "../lib/sensorDataAPI";
import { getPackagesInfo } from "../lib/packagesAPI";
import { getProductsInfo } from "../lib/productsAPI";
import groupDataStyle from "../styles/groupData.module.css";
import Graph from "./graph";
import { useTranslation } from "next-i18next";

const GroupData = ({ delivery_id, package_id }) => {
  const { t } = useTranslation("packages");
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);
  const [packagesInfo, setPackagesInfo] = useState([]);
  const [productsInfo, setProductsInfo] = useState([]);
  const [productId, setProductId] = useState();
  const [productLimits, setProductLimits] = useState([]);

  function getData() {
    getSensorData(delivery_id, package_id, "temperature")
      .then(setTemperatureData)
      .catch(console.error);
    getSensorData(delivery_id, package_id, "humidity")
      .then(setHumidityData)
      .catch(console.error);
    getSensorData(delivery_id, package_id, "shock")
      .then(setVibrationData)
      .catch(console.error);
    getSensorData(delivery_id, package_id, "light")
      .then(setLightData)
      .catch(console.error);
    getPackagesInfo().then(setPackagesInfo).catch(console.error);
    getProductsInfo().then(setProductsInfo).catch(console.error);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const productPackageLink = packagesInfo.filter(
      (colis) => colis.id === package_id
    );
    if (productPackageLink.length !== 0) {
      setProductId(productPackageLink[0].products[0].product);
    }
  }, [packagesInfo, package_id]);

  useEffect(() => {
    setProductLimits(
      productsInfo.filter((product) => product.id === productId)
    );
  }, [productsInfo, productId]);
  return (
    <div className={groupDataStyle.container}>
      {productLimits.length !== 0 && temperatureData.length !== 0 ? (
        <div className={groupDataStyle.graph}>
          <div className={groupDataStyle.data}>{t("temperature")}</div>
          {temperatureData.length !== 0 && (
            <div data-cy="packageTempGraph" style={{ width: "100%" }}>
              <Graph
                id="Temperature"
                sensorData={temperatureData}
                limitData={productLimits}
              />
            </div>
          )}
          <div className={groupDataStyle.data}>{t("humidity")}</div>
          {humidityData.length !== 0 && (
            <div data-cy="packageHumGraph" style={{ width: "100%" }}>
              <Graph
                sensorData={humidityData}
                limitData={productLimits}
                id="Humidity"
              />
            </div>
          )}
          <div className={groupDataStyle.data}>{t("light")}</div>
          {lightData.length !== 0 && (
            <div data-cy="packageLightGraph" style={{ width: "100%" }}>
              <Graph
                sensorData={lightData}
                limitData={productLimits}
                id="Light"
              />
            </div>
          )}
          <div className={groupDataStyle.data}>{t("vibration")}</div>
          {vibrationData.length !== 0 && (
            <div data-cy="packageShockGraph" style={{ width: "99%" }}>
              <Graph
                sensorData={vibrationData}
                limitData={productLimits}
                id="Vibration"
              />
            </div>
          )}
        </div>
      ) : (
        <div className={groupDataStyle.graph} data-cy="packageDetailNoData">
          {t("data")}
        </div>
      )}
    </div>
  );
};

export default GroupData;
