import React, { useEffect, useState } from "react";
import { getDeliveryOverview, getDeliveryData } from "../lib/deliveriesAPI";
import { getSensorData } from "../lib/sensorDataAPI";
import { useRouter } from "next/router";
import Image from "next/image";
import idStyle from "../styles/id.module.css";
import GroupData from "./groupData";
import moment from "moment";
import { useTranslation } from "next-i18next";
import DeliveryPath from "./deliveryPath";
import Loading from "./loading";
import dynamic from "next/dynamic";
import { getPackageLimit } from "../lib/packagesAPI";

const IdComponent = () => {
  const { t } = useTranslation("packages");
  const MapWithNoSSR = dynamic(() => import("./mapPackage"), {
    ssr: false,
  });
  const [deliveryDetail, setDeliveryDetail] = useState({});
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [tempLimits, setTempLimits] = useState({ temp_min: 0, temp_max: 0 });
  const [humLimits, setHumLimits] = useState({ hum_min: 0, hum_max: 0 });
  const [lightLimits, setLightLimits] = useState({
    light_min: 0,
    light_max: 0,
  });
  const [shockLimits, setShockLimits] = useState({
    shock_min: 0,
    shock_max: 0,
  });
  const [packageLimits, setPackageLimits] = useState({
    temp_min: 0,
    temp_max: 0,
    hum_min: 0,
    hum_max: 0,
    light_min: 0,
    light_max: 0,
    shock_min: 0,
    shock_max: 0,
  });
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [shockData, setShockData] = useState([]);
  const [cache, setCache] = useState({});
  const [minDate, setMinDate] = useState(temperatureData[0]?.date);
  const [maxDate, setMaxDate] = useState(
    temperatureData[temperatureData.length - 1]?.date
  );
  const [alerts, setAlerts] = useState([]);
  const [allTempData, setAllTempData] = useState([]);
  const [allHumData, setAllHumData] = useState([]);
  const [allLightData, setAllLightData] = useState([]);
  const [allShockData, setAllShockData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  function getData() {
    getSensorData(id, packageId, "temperature")
      .then(setTemperatureData)
      .catch(console.error);
    getSensorData(id, packageId, "humidity")
      .then(setHumidityData)
      .catch(console.error);
    getSensorData(id, packageId, "shock")
      .then(setShockData)
      .catch(console.error);
    getSensorData(id, packageId, "light")
      .then(setLightData)
      .catch(console.error);
  }

  function getAllData() {
    getDeliveryData(id, "temperature").then(setAllTempData);
    getDeliveryData(id, "humidity").then(setAllHumData);
    getDeliveryData(id, "shock").then(setAllShockData);
    getDeliveryData(id, "light").then(setAllLightData);
  }

  async function showDeliveryDetails(id) {
    const detail = await getDeliveryOverview(id);
    setDeliveryDetail(detail);
  }

  function getAlert() {
    const result = [];
    temperatureData.forEach((data) => {
      if (
        data.sensor_value > packageLimits.temp_max ||
        data.sensor_value < packageLimits.temp_min
      ) {
        result.push(data.date);
      }
    });
    humidityData.forEach((data) => {
      if (
        data.sensor_value > packageLimits.hum_max ||
        data.sensor_value < packageLimits.hum_min
      ) {
        result.push(data.date);
      }
    });
    lightData.forEach((data) => {
      if (
        data.sensor_value > packageLimits.light_max ||
        data.sensor_value < packageLimits.light_min
      ) {
        result.push(data.date);
      }
    });
    shockData.forEach((data) => {
      if (
        data.sensor_value > packageLimits.shock_max ||
        data.sensor_value < packageLimits.shock_min
      ) {
        result.push(data.date);
      }
    });
    setAlerts(result);
  }

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (packageId) {
      getData();
    }
  }, [packageId]);

  useEffect(() => {
    if (id) {
      showDeliveryDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (deliveryDetail) {
      setPackages(deliveryDetail.packages);
    }
  }, [deliveryDetail]);

  useEffect(() => {
    if (packages) {
      setPackageId(packages[0]?.id);
    }
  }, [packages]);

  useEffect(() => {
    if (packageId) {
      getSensorData(id, packageId, "location").then(setLocationData);
      getPackageLimit(id, packageId, "humidity").then((res) =>
        setHumLimits({
          hum_min: res.min_value,
          hum_max: res.max_value,
        })
      );
      getPackageLimit(id, packageId, "light").then((res) =>
        setLightLimits({
          light_min: res.min_value,
          light_max: res.max_value,
        })
      );
      getPackageLimit(id, packageId, "temperature").then((res) =>
        setTempLimits({
          temp_min: res.min_value,
          temp_max: res.max_value,
        })
      );
      getPackageLimit(id, packageId, "shock").then((res) =>
        setShockLimits({
          shock_min: res.min_value,
          shock_max: res.max_value,
        })
      );
    }
  }, [id, packageId]);

  useEffect(() => {
    setPackageLimits({
      temp_min: tempLimits.temp_min,
      temp_max: tempLimits.temp_max,
      hum_min: humLimits.hum_min,
      hum_max: humLimits.hum_max,
      light_min: lightLimits.light_min,
      light_max: lightLimits.light_max,
      shock_min: shockLimits.shock_min,
      shock_max: shockLimits.shock_max,
    });
  }, [tempLimits, humLimits, lightLimits, shockLimits]);

  useEffect(() => {
    getAlert();
  }, [packageLimits]);

  return (
    <>
      {packages ? (
        <div>
          <h2 className={idStyle.head} data-cy="packageDetailTitle">
            {t("pageTitle")}
          </h2>
          <div className={idStyle.headList}>
            <div>ID</div>
            <div>Alert</div>
            <div>{t("update")}</div>
          </div>
          {packages.map((colis, i) => (
            <div
              key={colis.id}
              className={
                packageId === colis.id
                  ? idStyle.list + " " + idStyle.showGraph
                  : idStyle.list
              }
              onClick={() => setPackageId(colis.id)}
            >
              <div
                data-cy={"packageDetailId" + i}
                className={idStyle.idPackage}
              >
                {colis.id}
              </div>
              {colis.alert ? (
                <div
                  className={idStyle.alertPackage}
                  onClick={() => {
                    router.push({
                      pathname: "/alarms/",
                      query: {
                        deliveryId: deliveryDetail.id,
                        packageId: deliveryDetail.packages[0].id,
                      },
                    });
                  }}
                >
                  <Image
                    src="/images/alerts-active@3x.png"
                    alt="alarm"
                    height={30}
                    width={30}
                  />
                </div>
              ) : (
                <div className={idStyle.alertPackage}>
                  <Image
                    src="/images/alerts@3x.png"
                    alt="alarm"
                    height={30}
                    width={30}
                  />
                </div>
              )}
              <div
                data-cy="packageDetailUpdate"
                className={idStyle.datePackage}
              >
                {moment(`${colis.last_updated}`, "YYYYMMDD").fromNow()}
              </div>
            </div>
          ))}
          <div className="w-[95%] mx-auto mt-7">
            {locationData && (
              <MapWithNoSSR
                deliveryId={id}
                location={locationData}
                packageId={packageId}
                deliveries={deliveryDetail}
                packageLimits={packageLimits}
                minDate={minDate}
                maxDate={maxDate}
                alerts={alerts}
              />
            )}
          </div>
          <div className="mx-auto w-[90%]">
            <DeliveryPath id={id} />
          </div>
          {packageId && (
            <GroupData
              temperatureData={temperatureData}
              humidityData={humidityData}
              lightData={lightData}
              vibrationData={shockData}
              minDate={minDate}
              setMinDate={setMinDate}
              maxDate={maxDate}
              setMaxDate={setMaxDate}
              packageLimits={packageLimits}
              allTemp={allTempData}
              allHum={allHumData}
              allLight={allLightData}
              allShock={allShockData}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default IdComponent;
