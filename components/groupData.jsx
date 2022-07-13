import { useEffect, useState } from "react";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import groupDataStyle from "../styles/groupData.module.css";
import { useTranslation } from "next-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation("packages");
  const [datesPicker, setDatePicker] = useState({});
  const GraphWithNoSSR = dynamic(() => import("./graph"), {
    ssr: false,
  });
  const GraphAllWithNoSSR = dynamic(() => import("./graphAllPackages"), {
    ssr: false,
  });

  function handleClickMin() {
    setDatePicker({ ...datesPicker, startDate: temperatureData[0]?.date });
    setMinDate(temperatureData[0]?.date);
  }

  function handleClickMax() {
    setDatePicker({
      ...datesPicker,
      endDate: temperatureData[temperatureData.length - 1]?.date,
    });
    setMaxDate(temperatureData[temperatureData.length - 1]?.date);
  }
  useEffect(() => {
    if (!showAll) {
      setMinDate(temperatureData[0]?.date);
      setMaxDate(temperatureData[temperatureData.length - 1]?.date);
      if (temperatureData[0]) {
        setDatePicker({
          startDate: temperatureData[0]?.date.slice(0, 10).replace(/-/g, "/"),
          endDate: temperatureData[temperatureData.length - 1]?.date
            .slice(0, 10)
            .replace(/-/g, "/"),
        });
      }
    }
  }, [temperatureData]);

  useEffect(() => {
    if (showAll) {
      if (allTemp.DatesList) {
        setMaxDate(allTemp.DatesList[allTemp.DatesList.length - 1]);
        setMinDate(allTemp.DatesList[0]);
      }
    }
  }, [allTemp]);

  return (
    <>
      <div className="flex flex-col w-[90%] mx-auto pt-2">
        <label htmlFor="allData-show" className="my-2 text-sm">
          Show all Data :
          <input
            type="checkbox"
            id="allData-show"
            className="mx-4"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
          />
        </label>
        <label htmlFor="minDate-select" className="my-2 text-sm">
          Choose the min date:
        </label>
        <div className="flex h-7 m-2 w-[100%] justify-center items-center z-[2000]">
          <div className="flex flex-initial items-center">
            <DatePicker
              onChange={(date) => {
                setDatePicker({ ...datesPicker, startDate: date });
                setMinDate(moment(date).format("YYYY-MM-DD"));
              }}
              selected={new Date(datesPicker.startDate || null)}
              dateFormat="dd/MM/yyyy"
              minDate={
                new Date(
                  temperatureData[0]?.date.slice(0, 10).replace(/-/g, "/")
                )
              }
              maxDate={new Date(datesPicker.endDate || null)}
              className="p-[4px] w-[70vw] rounded"
            />
            <button
              onClick={() => handleClickMin()}
              className="ml-3 text-white text-l border-white border-2 w-7"
              style={{ backgroundColor: "var(--main-color)" }}
            >
              ✗
            </button>
          </div>
        </div>
        <label htmlFor="maxDate-select" className="my-2 text-sm">
          Choose the max date:
        </label>
        <div className="flex h-7 m-2 w-[100%] justify-center">
          <div className="flex flex-initial items-center z-[2000]">
            <DatePicker
              onChange={(date) => {
                setDatePicker({ ...datesPicker, endDate: date });
                setMaxDate(moment(date).format("YYYY-MM-DD"));
              }}
              selected={new Date(datesPicker.endDate || null)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date(datesPicker.startDate || null)}
              maxDate={
                new Date(temperatureData[temperatureData.length - 1]?.date)
              }
              className="p-[4px] w-[70vw] rounded"
            />
            <button
              onClick={() => handleClickMax()}
              className="ml-3 text-white text-l border-white border-2 w-7"
              style={{ backgroundColor: "var(--main-color)" }}
            >
              ✗
            </button>
          </div>
        </div>
      </div>
      <div className={groupDataStyle.container}>
        {packageLimits.length !== 0 && temperatureData.length !== 0 ? (
          <div>
            <div className={groupDataStyle.graph}>
              {showAll && (
                <div>
                  <div data-cy="packageTempGraph" style={{ width: "90vw" }}>
                    <GraphAllWithNoSSR
                      id="Temperature"
                      sensorData={allTemp}
                      limitData={packageLimits}
                      showXAxis={false}
                      minDate={minDate}
                      maxDate={maxDate}
                      showLabel={true}
                    />
                  </div>
                  <div data-cy="packageHumGraph" style={{ width: "100%" }}>
                    <GraphAllWithNoSSR
                      sensorData={allHum}
                      limitData={packageLimits}
                      id="Humidity"
                      showXAxis={false}
                      minDate={minDate}
                      maxDate={maxDate}
                      showLabel={false}
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
                      showLabel={false}
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
                      showLabel={false}
                    />
                  </div>
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
