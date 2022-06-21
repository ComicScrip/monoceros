import { useEffect, useState } from "react";
import { getSensorData } from "../lib/sensorDataAPI";
import { getPackagesInfo } from "../lib/packagesAPI";
import { getProductsInfo } from "../lib/productsAPI";
import groupDataStyle from "../styles/groupData.module.css";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const GroupData = ({ delivery_id, package_id }) => {
  const { t } = useTranslation("packages");
  const GraphWithNoSSR = dynamic(() => import("./graph"), {
    ssr: false,
  });
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
  }, [package_id]);

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
          {temperatureData.length !== 0 && (
            <div data-cy="packageTempGraph" style={{ width: "100%" }}>
              <GraphWithNoSSR
                id="Temperature"
                sensorData={temperatureData}
                limitData={productLimits}
                showXAxis={false}
              />
            </div>
          )}
          {humidityData.length !== 0 && (
            <div data-cy="packageHumGraph" style={{ width: "100%" }}>
              <GraphWithNoSSR
                sensorData={humidityData}
                limitData={productLimits}
                id="Humidity"
                showXAxis={false}
              />
            </div>
          )}
          {lightData.length !== 0 && (
            <div data-cy="packageLightGraph" style={{ width: "100%" }}>
              <GraphWithNoSSR
                sensorData={lightData}
                limitData={productLimits}
                id="Light"
                showXAxis={false}
              />
            </div>
          )}
          {vibrationData.length !== 0 && (
            <div data-cy="packageShockGraph" style={{ width: "100%" }}>
              <GraphWithNoSSR
                sensorData={vibrationData}
                limitData={productLimits}
                id="Vibration"
                showXAxis={true}
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
