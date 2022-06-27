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

  function handleClickMin() {
    setMinDate(temperatureData[0]?.date);
  }

  function handleClickMax() {
    setMaxDate(temperatureData[temperatureData.length - 1]?.date);
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
    <>
      <div className="flex flex-col w-[90%] mx-auto pt-2">
        <label htmlFor="minDate-select" className="my-2">
          Choose the min date:
        </label>
        <div className="flex h-7 m-2 w-[100%]">
          <select
            name="minDate"
            id="minDate-select"
            className="rounded bg-white w-[90vw] h-7"
            onChange={(e) => setMinDate(e.target.value)}
            value={minDate}
          >
            <option value="">--Please choose an option--</option>
            {temperatureData
              .filter((data) => moment(data.date).isBefore(maxDate))
              .map((data, i) => (
                <option key={i} value={data.date}>
                  {moment(data.date).format("DD-MM-YY, h:mm:ss")}
                </option>
              ))}
          </select>
          <button
            onClick={() => handleClickMin()}
            className="ml-3 text-white text-l border-white border-2 w-7"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            ✗
          </button>
        </div>
        <label htmlFor="maxDate-select" className="my-2">
          Choose the max date:
        </label>
        <div className="flex h-7 m-2 w-[100%]">
          <select
            name="maxDate"
            id="maxDate-select"
            className="rounded bg-white w-[90vw] h-7"
            onChange={(e) => setMaxDate(e.target.value)}
            value={maxDate}
          >
            <option value="">--Please choose an option--</option>
            {temperatureData
              .filter((data) => moment(data.date).isAfter(minDate))
              .map((data, i) => (
                <option key={i} value={data.date}>
                  {moment(data.date).format("DD-MM-YY, h:mm:ss")}
                </option>
              ))}
          </select>
          <button
            onClick={() => handleClickMax()}
            className="ml-3 text-white text-l border-white border-2 w-7"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            ✗
          </button>
        </div>
      </div>
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
    </>
  );
};

export default GroupData;
