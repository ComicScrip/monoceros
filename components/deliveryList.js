import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryOverview from "./deliveryOverview";
import { useState } from "react";
import { getDeliveryOverview } from "../lib/deliveriesAPI";

function DeliveryList({ allDeliveries }) {
  const [deliveryOverview, setDeliveryOverview] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  async function showDeliveryOverview(id) {
    const idStrg = id.toString();
    await getDeliveryOverview(idStrg)
      .then(setDeliveryOverview)
      .then(() => setShowDetails(true));
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
          <DeliveryOverview deliveryDetail={deliveryOverview} />
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
              onClick={() => showDeliveryOverview(delivery.id)}
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
