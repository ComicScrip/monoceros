import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";

const HumidityData = ({ data }) => {
  return (
    <div className={sensorDataStyle.global}>
      <h3 className={sensorDataStyle.titre}>Humidity</h3>
      <div className={sensorDataStyle.data}>
        {data ? <p>{data[0] || 0} %</p> : <p>none</p>}
        <Image
          priority
          src="/images/humidity-logo.png"
          height={25}
          width={30}
          alt="humidity"
        />
      </div>
    </div>
  );
};

export default HumidityData;
