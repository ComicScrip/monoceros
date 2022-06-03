import { useState, useEffect } from "react";
import { getDeliveries } from "../lib/monocerosAPI";
import deliveriesStyle from "../styles/deliveries.module.css";

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    getDeliveries().then(setDeliveries);
  }, []);
  console.log(deliveries);

  return (
    <table className={deliveriesStyle.table}>
      <thead>
        <tr>
          <th className={deliveriesStyle.tHeader}>ID</th>
        </tr>
      </thead>
      <tbody>
        {deliveries.map((d) => (
          <tr className={deliveriesStyle.tRow} key={d.id}>
            <td className={deliveriesStyle.tCell}>{d.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeliveryList;
