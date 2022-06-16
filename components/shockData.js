import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";
import { getSensorData, getDeliveryOverview } from "../lib/deliveriesAPI";
import { useEffect, useState } from "react";

const ShockData = ({ data }) => {
  return (
    <div className={sensorDataStyle.global}>
      <h3 className={sensorDataStyle.titre}>Shock</h3>
      <div className={sensorDataStyle.data}>
        {data[0] || 0}
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
