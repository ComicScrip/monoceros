import { useTranslation } from "next-i18next";
import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";

const LightData = () => {
  const { t } = useTranslation("deliveries");
  return (
    <div className={sensorDataStyle.global} data-cy="deliveryDetailLight">
      <h3 className={sensorDataStyle.titre}>{t("light")}</h3>
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
