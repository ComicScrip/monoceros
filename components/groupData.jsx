import { useEffect, useState } from "react";
import { getSensorData } from "../lib/monocerosAPI";
import groupDataStyle from "../styles/groupData.module.css";
import Graph from "./graph";

const GroupData = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  function getData() {
    getSensorData().then(setTemperatureData);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log("data", temperatureData);
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
