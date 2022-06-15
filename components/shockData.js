import { useTranslation } from "next-i18next";
import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";

const ShockData = () => {
  const { t } = useTranslation("deliveries");
  return (
    <div className={sensorDataStyle.global}>
      <h3 className={sensorDataStyle.titre}>{t("shock")}</h3>
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
