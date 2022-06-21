import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";

const TemperatureData = ({ data }) => {
  return (
    <div className={sensorDataStyle.global} data-cy="deliveryDetailTemperature">
      <h3 className={sensorDataStyle.titre}>Temp.</h3>
      <div className={sensorDataStyle.data}>
        {data ? <p>{data[0] || 0} °C</p> : <p>none</p>}
        <Image
          priority
          src="/images/temperature-logo.png"
          height={25}
          width={30}
          alt="temperature"
        />
      </div>
    </div>
  );
};

export default TemperatureData;
