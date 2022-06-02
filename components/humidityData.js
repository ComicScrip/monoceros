import Image from "next/image";
import humidityStyle from "../styles/humidity.module.css";

const HumidityData = () => {
  return (
    <div className={humidityStyle.global}>
      <h3 className={humidityStyle.titre}>Humidity</h3>
      <div className={humidityStyle.humidity}>
        <p>30 %</p>
        <Image
          priority
          src="/images/humidity-logo.png"
          height={12}
          width={30}
          alt="marqueur"
        />
      </div>
    </div>
  );
};

export default HumidityData;
