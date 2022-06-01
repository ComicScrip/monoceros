import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryDetail from "./deliveryDetail";
import { useState } from "react";
import axios from "axios";

function DeliveryList({ allDeliveries }) {
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const access_token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MTI3NTM1LCJqdGkiOiIzMGM4YzcyOTAxZjU0MWVjODMzNzEyZjhhZDE4YzYzOSIsInVzZXJfaWQiOjEwMH0.UiF68aTMBbhPjgr7LdJVogpRtirn-ejNZNu9Yk0jcUo";
  async function getDeliveryDetails(deliveryId) {
    await axios
      .get(
        `https://devbackend.monoceros-sas.com/api/deliveries/deliveries/${deliveryId}/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => setDeliveryDetails(res.data));
  }
  // async function getTemperatureData(packageId, deliveryId) {
  //   await axios
  //     .get(
  //       `https://devbackend.monoceros-sas.com/api/deliveries/delivery-package/sensors-data/?package_id=${packageId}&delivery_id=${deliveryId}&sensor_type=temperature`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       }
  //     )
  //     .then((res) => res.data);
  // }
  async function showDeliveryDetails(id) {
    const idStrg = id.toString();
    await getDeliveryDetails(idStrg).then(() => setShowDetails(!showDetails));
  }
  return (
    <>
      {showDetails && (
        <DeliveryDetail
          deliveryDetail={deliveryDetails}
          access_token={access_token}
        />
      )}
      <table className={deliveriesStyle.table}>
        <thead>
          <tr>
            <th className={deliveriesStyle.tHeader}>ID</th>
            <th className={deliveriesStyle.tHeader}>Status</th>
            <th className={deliveriesStyle.tHeader}>Alert</th>
            <th className={deliveriesStyle.tHeader}>Ref.</th>
            <th className={deliveriesStyle.tHeader}>Destination</th>
            <th className={deliveriesStyle.tHeader}>Date</th>
          </tr>
        </thead>
        <tbody>
          {allDeliveries.map((delivery) => (
            <tr className={deliveriesStyle.tRow} key={delivery.id}>
              <td
                className={deliveriesStyle.tCell}
                onClick={() => showDeliveryDetails(delivery.id)}
              >
                {delivery.id}
              </td>
              <td className={deliveriesStyle.tCell}>{delivery.status}</td>
              <td className={deliveriesStyle.tCell}>Vert</td>
              <td className={deliveriesStyle.tCell}>JB</td>
              <td className={deliveriesStyle.tCell}>
                {delivery.delivery_path.shipment_paths[0].destination.city}
              </td>
              <td className={deliveriesStyle.tCell}>{delivery.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DeliveryList;
