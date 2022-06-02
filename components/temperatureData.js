import Image from "next/image";
import temperatureStyle from "../styles/temperature.module.css";

const TemperatureData = () => {
  return (
    <div className={temperatureStyle.global}>
      <h3 className={temperatureStyle.titre}>Temp.</h3>
      <div className={temperatureStyle.temperature}>
        <p>22 °C</p>
        <Image
          priority
          src="/images/temperature-logo.png"
          height={12}
          width={30}
          alt="marqueur"
        />
      </div>
    </div>
  );
};

export default TemperatureData;
