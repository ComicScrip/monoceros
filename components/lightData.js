import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";

const LightData = () => {
  return (
    <div className={sensorDataStyle.global}>
      <h3 className={sensorDataStyle.titre}>Light</h3>
      <div className={sensorDataStyle.data}>
        <p>1000Lm</p>
        <Image
          priority
          src="/images/light-logo.png"
          height={30}
          width={30}
          alt="light"
        />
      </div>
    </div>
  );
};

export default LightData;
