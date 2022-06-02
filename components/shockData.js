import Image from "next/image";
import shockStyle from "../styles/shock.module.css";

const ShockData = () => {
  return (
    <div className={shockStyle.global}>
      <h3 className={shockStyle.titre}>Shock</h3>
      <div className={shockStyle.shock}>
        <p>1,054</p>
        <Image
          priority
          src="/images/shock-logo.png"
          height={12}
          width={30}
          alt="marqueur"
        />
      </div>
    </div>
  );
};

export default ShockData;
