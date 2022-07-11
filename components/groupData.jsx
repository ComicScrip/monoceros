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
}) => {
  const { t } = useTranslation("packages");
  const [datesPicker, setDatePicker] = useState({});
  const GraphWithNoSSR = dynamic(() => import("./graph"), {
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
  }, [temperatureData]);
  return (
    <>
      <div className="flex flex-col w-[90%] mx-auto pt-2">
        <label htmlFor="minDate-select" className="my-2 text-sm">
          Choose the min date:
        </label>
        <div className="flex h-7 m-2 w-[100%] justify-center items-center">
          <div className="flex flex-initial items-center">
            <DatePicker
              onChange={(date) => {
                setDatePicker({ ...datesPicker, startDate: date });
                setMinDate(moment(date).format("YYYY-MM-DD"));
              }}
              selected={new Date(datesPicker.startDate || null)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date(minDate?.replace("-", "/"))}
              maxDate={new Date(maxDate?.replace("-", "/"))}
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
          <div className="flex flex-initial items-center">
            <DatePicker
              onChange={(date) => {
                setDatePicker({ ...datesPicker, endDate: date });
                setMaxDate(moment(date).format("YYYY-MM-DD"));
              }}
              selected={new Date(datesPicker.endDate || null)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date(minDate?.replace("-", "/"))}
              manDate={new Date(maxDate?.replace("-", "/"))}
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
