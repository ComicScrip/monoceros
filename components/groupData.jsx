import { useEffect, useState } from "react";
import { getSensorData } from "../lib/sensorDataAPI";
import { getPackagesInfo } from "../lib/packagesAPI";
import { getProductsInfo } from "../lib/productsAPI";
import groupDataStyle from "../styles/groupData.module.css";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import moment from "moment";

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
  const [minDate, setMinDate] = useState(temperatureData[0]?.date);
  const [maxDate, setMaxDate] = useState(
    temperatureData[temperatureData.length - 1]?.date
  );

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

  useEffect(() => {
    setMinDate(temperatureData[0]?.date);
    setMaxDate(temperatureData[temperatureData.length - 1]?.date);
  }, [temperatureData]);

  return (
    <div className={groupDataStyle.container}>
      <div className="flex flex-col w-[60%] mx-auto">
        <label htmlFor="minDate-select">Choose the min date:</label>
        <select
          name="minDate"
          id="minDate-select"
          onChange={(e) => setMinDate(e.target.value)}
          value={minDate}
        >
          <option value="">--Please choose an option--</option>
          {temperatureData.map((data, i) => (
            <option
              key={i}
              value={moment(data.date).format("DD-MM-YY, h:mm:ss")}
            >
              {moment(data.date).format("DD-MM-YY, h:mm:ss")}
            </option>
          ))}
        </select>
        <label htmlFor="maxDate-select">Choose the max date:</label>
        <select
          name="maxDate"
          id="maxDate-select"
          onChange={(e) => setMaxDate(e.target.value)}
          value={maxDate}
        >
          <option value="">--Please choose an option--</option>
          {temperatureData.map((data, i) => (
            <option
              key={i}
              value={moment(data.date).format("DD-MM-YY, h:mm:ss")}
            >
              {moment(data.date).format("DD-MM-YY, h:mm:ss")}
            </option>
          ))}
        </select>
      </div>
      {productLimits.length !== 0 && temperatureData.length !== 0 ? (
        <div className={groupDataStyle.graph}>
          {temperatureData.length !== 0 && (
            <div data-cy="packageTempGraph" style={{ width: "100%" }}>
              <GraphWithNoSSR
                id="Temperature"
                sensorData={temperatureData}
                limitData={productLimits}
                showXAxis={false}
                minDate={minDate}
                maxDate={maxDate}
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
                minDate={minDate}
                maxDate={maxDate}
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
                minDate={minDate}
                maxDate={maxDate}
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
                minDate={minDate}
                maxDate={maxDate}
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
