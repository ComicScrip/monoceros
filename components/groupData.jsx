import { useEffect, useState } from "react";
import groupDataStyle from "../styles/groupData.module.css";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import moment from "moment";

const GroupData = ({
  temperatureData,
  humidityData,
  lightData,
  vibrationData,
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  packageLimits,
  allTemp,
  allHum,
  allLight,
  allShock,
}) => {
  const [showAll, setShowAll] = useState(true);
  const { t } = useTranslation("packages");
  const GraphWithNoSSR = dynamic(() => import("./graph"), {
    ssr: false,
  });
  const GraphAllWithNoSSR = dynamic(() => import("./graphAllPackages"), {
    ssr: false,
  });

  function handleClickMin() {
    setMinDate(temperatureData[0]?.date);
  }

  function handleClickMax() {
    setMaxDate(temperatureData[temperatureData.length - 1]?.date);
  }

  useEffect(() => {
    setMinDate(temperatureData[0]?.date);
    setMaxDate(temperatureData[temperatureData.length - 1]?.date);
  }, [temperatureData]);

  return (
    <>
      <div className="flex flex-col w-[90%] mx-auto pt-2">
        <label htmlFor="allData-show">
          Show all Data :
          <input
            type="checkbox"
            id="allData-show"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
        </label>
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
        {packageLimits.length !== 0 && temperatureData.length !== 0 ? (
          <div>
            <div className={groupDataStyle.graph}>
              {showAll && (
                <div>
                  <div data-cy="packageTempGraph" style={{ width: "100%" }}>
                    <GraphAllWithNoSSR
                      id="Temperature"
                      sensorData={allTemp}
                      limitData={packageLimits}
                      showXAxis={false}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>
                  {/* <div data-cy="packageHumGraph" style={{ width: "100%" }}>
                    <GraphAllWithNoSSR
                      sensorData={allHum}
                      limitData={packageLimits}
                      id="Humidity"
                      showXAxis={false}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>
                  <div data-cy="packageLightGraph" style={{ width: "100%" }}>
                    <GraphAllWithNoSSR
                      sensorData={allLight}
                      limitData={packageLimits}
                      id="Light"
                      showXAxis={false}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>
                  <div data-cy="packageShockGraph" style={{ width: "100%" }}>
                    <GraphAllWithNoSSR
                      sensorData={allShock}
                      limitData={packageLimits}
                      id="Vibration"
                      showXAxis={true}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div> */}
                </div>
              )}
            </div>
            {!showAll && (
              <div className={groupDataStyle.graph}>
                {temperatureData.length !== 0 && (
                  <div data-cy="packageTempGraph" style={{ width: "100%" }}>
                    <GraphWithNoSSR
                      id="Temperature"
                      sensorData={temperatureData}
                      limitData={packageLimits}
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
                      limitData={packageLimits}
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
                      limitData={packageLimits}
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
                      limitData={packageLimits}
                      id="Vibration"
                      showXAxis={true}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  </div>
                )}
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
