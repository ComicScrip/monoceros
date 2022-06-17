import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryOverview from "./deliveryOverview";
import { useState, useEffect } from "react";
import { getDeliveryOverview } from "../lib/deliveriesAPI";
import { getDeliveries } from "../lib/deliveriesAPI";

function DeliveryList() {
  const [deliveryOverview, setDeliveryOverview] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [allDeliveries, setAllDeliveries] = useState([]);
  useEffect(() => {
    getDeliveries().then(setAllDeliveries);
  }, []);

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
          <DeliveryOverview
            deliveryDetail={deliveryOverview}
            deliveries={allDeliveries}
          />
        </div>
      )}
      <table className={deliveriesStyle.table}>
        <thead className={deliveriesStyle.allHead} data-cy="tableHeader">
          <tr>
            <th className={deliveriesStyle.tHeader}>ID</th>
            <th className={deliveriesStyle.tHeader}>Status</th>
            <th className={deliveriesStyle.tHeader}>Ref.</th>
            <th className={deliveriesStyle.tHeader}>Destination</th>
            <th className={deliveriesStyle.tHeader}>Date</th>
          </tr>
        </thead>
        <tbody>
          {allDeliveries.map((delivery, i) => (
            <tr
              className={
                delivery.alerts_count !== null
                  ? deliveriesStyle.alert
                  : deliveriesStyle.noAlert
              }
              data-cy={"deliveryRow" + i}
              key={delivery.id}
              onClick={() => showDeliveryOverview(delivery.id)}
            >
              <td className={deliveriesStyle.tCell} data-cy="deliveryId">
                {delivery.id}
              </td>
              <td className={deliveriesStyle.tCell} data-cy="deliveryStatus">
                {delivery.status}
              </td>
              <td className={deliveriesStyle.tCell}>Vert</td>
              <td className={deliveriesStyle.tCell} data-cy="deliveryContact">
                {delivery.delivery_path.shipment_paths[0].origin.contact_name}
              </td>
              <td
                className={deliveriesStyle.tCell}
                data-cy="deliveryDestination"
              >
                {delivery.delivery_path.shipment_paths[0].destination.city}
              </td>
              <td className={deliveriesStyle.tCell} data-cy="deliveryEndDate">
                {delivery.end_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DeliveryList;
