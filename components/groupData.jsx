import { useEffect, useState } from "react";
import { getSensorData } from "../lib/sensorDataAPI";
import groupDataStyle from "../styles/groupData.module.css";
import Graph from "./graph";

const GroupData = ({ delivery_id, package_id }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);
  function getData() {
    getSensorData(delivery_id, package_id, "temperature").then(
      setTemperatureData
    );
    getSensorData(delivery_id, package_id, "humidity").then(setHumidityData);
    getSensorData(delivery_id, package_id, "shock").then(setVibrationData);
    getSensorData(delivery_id, package_id, "light").then(setLightData);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(temperatureData);
  return (
    <div className={groupDataStyle.container}>
      {temperatureData.length !== 0 ? (
        <div className={groupDataStyle.graph}>
          <div className={groupDataStyle.data}>Temperature</div>
          <Graph sensorData={temperatureData} />
          <div className={groupDataStyle.data}>Humidity</div>
          <Graph sensorData={humidityData} />
          <div className={groupDataStyle.data}>Light</div>
          <Graph sensorData={lightData} />
          <div className={groupDataStyle.data}>Vibration</div>
          <Graph sensorData={vibrationData} />
        </div>
      ) : (
        <div className={groupDataStyle.graph}>Pas de données</div>
      )}
    </div>
  );
};

export default GroupData;
