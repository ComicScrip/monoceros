import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";

const TemperatureData = () => {
  return (
    <div className={sensorDataStyle.global}>
      <h3 className={sensorDataStyle.titre}>Temp.</h3>
      <div className={sensorDataStyle.data}>
        <p>22 °C</p>
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
