import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryDetail from "./deliveryDetail";
import { useState } from "react";
import axios from "axios";

function DeliveryList({ allDeliveries }) {
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const access_token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0Njg2ODUyLCJqdGkiOiI3YzEwNWU0MWQ0NTQ0NTY2OGU1YWI1NDIzMzRkYWI5MyIsInVzZXJfaWQiOjEwMH0.8FkfuI8SiTgcR4_oXJtbxTyfMcGfTf_iM8aL1_GwbJ4";
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
  async function showDeliveryDetails(id) {
    const idStrg = id.toString();
    await getDeliveryDetails(idStrg).then(() => setShowDetails(true));
  }
  return (
    <>
      {showDetails && (
        <div>
          <span
            onClick={() => setShowDetails(false)}
            className={deliveriesStyle.closeBtn}
          >
            &times;
          </span>
          <DeliveryDetail
            deliveryDetail={deliveryDetails}
            access_token={access_token}
          />
        </div>
      )}
      <table className={deliveriesStyle.table}>
        <thead className={deliveriesStyle.allHead}>
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
            <tr
              className={deliveriesStyle.tRow + " " + deliveriesStyle.id}
              key={delivery.id}
              onClick={() => showDeliveryDetails(delivery.id)}
            >
              <td className={deliveriesStyle.tCell}>{delivery.id}</td>
              <td className={deliveriesStyle.tCell}>{delivery.status}</td>
              <td className={deliveriesStyle.tCell}>Vert</td>
              <td className={deliveriesStyle.tCell}>
                {delivery.delivery_path.shipment_paths[0].origin.contact_name}
              </td>
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
