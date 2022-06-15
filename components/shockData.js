import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";
import { getSensorData, getDeliveryOverview } from "../lib/deliveriesAPI";
import { useEffect, useState } from "react";

const ShockData = ({ deliveryId, packages }) => {
  const [sensorsData, setSensorsData] = useState([]);
  const sensors = ["temperature", "light", "shock", "humidity"];

  useEffect(() => {
    console.log(deliveryId);
    console.log(packages);
    async function getData() {
      for (const dataType of sensors) {
        //console.log(dataType);
        const data = await getSensorData(deliveryId, packages[0].id, dataType);
        //console.log(data);
        setSensorsData([...sensorDataStyle, data[0].sensor_value]);
        console.log([dataType, data[0].sensor_value]);
      }
    }
    getData();
  }, []);
  console.log(sensorsData);
  return (
    <div className={sensorDataStyle.global}>
      <h3 className={sensorDataStyle.titre}>Shock</h3>
      <div className={sensorDataStyle.data}>
        <p>1,054</p>
        <Image
          priority
          src="/images/shock-logo.png"
          height={25}
          width={30}
          alt="shock"
        />
      </div>
    </div>
  );
};

export default ShockData;
