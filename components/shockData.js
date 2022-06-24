import Image from "next/image";
import sensorDataStyle from "../styles/sensorData.module.css";
import { useTranslation } from "next-i18next";

const ShockData = ({ data }) => {
  const { t } = useTranslation("deliveries");
  return (
    <div className={sensorDataStyle.global} data-cy="deliveryDetailShock">
      <h3 className={sensorDataStyle.titre}>{t("shock")}</h3>
      <div className={sensorDataStyle.data}>
        {data ? <p>{data[0] || 0}</p> : <p>none</p>}

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
