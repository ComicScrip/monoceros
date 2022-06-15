import { useEffect, useState } from "react";
import { getSensorData } from "../lib/sensorDataAPI";
import { getPackagesInfo } from "../lib/packagesAPI";
import { getProductsInfo } from "../lib/productsAPI";
import groupDataStyle from "../styles/groupData.module.css";
import Graph from "./graph";

const GroupData = ({ delivery_id, package_id }) => {
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
          <div className={groupDataStyle.data}>Temperature</div>
          {temperatureData.length !== 0 && (
            <Graph
              id="Temperature"
              sensorData={temperatureData}
              limitData={productLimits}
            />
          )}
          <div className={groupDataStyle.data}>Humidity</div>
          {humidityData.length !== 0 && (
            <Graph
              sensorData={humidityData}
              limitData={productLimits}
              id="Humidity"
            />
          )}
          <div className={groupDataStyle.data}>Light</div>
          {lightData.length !== 0 && (
            <Graph
              sensorData={lightData}
              limitData={productLimits}
              id="Light"
            />
          )}
          <div className={groupDataStyle.data}>Vibration</div>
          {vibrationData.length !== 0 && (
            <Graph
              sensorData={vibrationData}
              limitData={productLimits}
              id="Vibration"
            />
          )}
        </div>
      ) : (
        <div className={groupDataStyle.graph}>Pas de données</div>
      )}
    </div>
  );
};

export default GroupData;
