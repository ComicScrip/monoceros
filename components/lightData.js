import Image from "next/image";
import lightStyle from "../styles/light.module.css";

const LightData = () => {
  return (
    <div className={lightStyle.global}>
      <h3 className={lightStyle.titre}>Light</h3>
      <div className={lightStyle.light}>
        <p>1000Lm</p>
        <Image
          priority
          src="/images/light-logo.png"
          height={12}
          width={30}
          alt="marqueur"
        />
      </div>
    </div>
  );
};

export default LightData;
