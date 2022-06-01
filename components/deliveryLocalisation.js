import Image from "next/image";
import { useRef } from "react";
import localisationStyle from "../styles/localisation.module.css";

const DeliveryLocalisation = ({ deliveryId, deliveriesLoc }) => {
  const [delivery] = deliveriesLoc.filter((loc) => loc.id === deliveryId);
  let latitude = useRef("-");
  let longitude = useRef("-");
  console.log(delivery);
  // useEffect(() => {
  //   delivery.location.gpsla
  //     ? (latitude.current = delivery.location.gpsla)
  //     : latitude;
  //   delivery.location.gpslo
  //     ? (longitude.current = delivery.location.gpslo)
  //     : longitude;
  // }, [delivery]);

  return (
    <div className={localisationStyle.localisation}>
      <p className={localisationStyle.head}>Location</p>
      <div className={localisationStyle.coordonnees}>
        <p>
          {latitude.current}/{longitude.current}
        </p>
        <Image
          priority
          src="/images/marqueur-logo2.png"
          height={12}
          width={12}
          alt="marqueur"
        />
      </div>
    </div>
  );
};

export default DeliveryLocalisation;
