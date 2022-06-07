import { useEffect, useState } from "react";
import { getSensorData } from "../lib/monocerosAPI";
import groupDataStyle from "../styles/groupData.module.css";

const GroupData = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  function getData() {
    const data = getSensorData();
    setTemperatureData(data);
  }
  useEffect(() => {
    getData();
  });
  console.log("data", temperatureData);
  return (
    <div className={groupDataStyle.container}>
      <div className={groupDataStyle.head}>
        <div className={groupDataStyle.data}>Temperature</div>
        <div className={groupDataStyle.data}>Humidity</div>
        <div className={groupDataStyle.data}>Light</div>
        <div className={groupDataStyle.data}>Vibration</div>
      </div>
      <div className={groupDataStyle.graph}>GRAPHE</div>
    </div>
  );
};

export default GroupData;
