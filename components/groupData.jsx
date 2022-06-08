import { useEffect, useState } from "react";
import { getSensorData } from "../lib/monocerosAPI";
import groupDataStyle from "../styles/groupData.module.css";
import Graph from "./graph";

const GroupData = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);
  function getData() {
    getSensorData("177", "225", "temperature").then(setTemperatureData);
    getSensorData("177", "225", "humidity").then(setHumidityData);
    getSensorData("177", "225", "shock").then(setVibrationData);
    getSensorData("177", "225", "light").then(setLightData);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log("temp", temperatureData);
  console.log("hum", humidityData);
  console.log("light", lightData);
  console.log("shock", vibrationData);
  return (
    <div className={groupDataStyle.container}>
      <div className={groupDataStyle.head}>
        <div className={groupDataStyle.data}>Temperature</div>
        <div className={groupDataStyle.data}>Humidity</div>
        <div className={groupDataStyle.data}>Light</div>
        <div className={groupDataStyle.data}>Vibration</div>
      </div>
      <div className={groupDataStyle.graph}>
        <Graph />
      </div>
    </div>
  );
};

export default GroupData;
