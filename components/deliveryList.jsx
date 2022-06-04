import { useState, useEffect } from "react";
import {
  getCurrentUserProfile,
  getDeliveries,
  getDeliveriesOverview,
} from "../lib/monocerosAPI";
import deliveriesStyle from "../styles/deliveries.module.css";

const DeliveryList = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [overview, setOverview] = useState({});
  const [userInfos, setUserInfos] = useState({});
  useEffect(() => {
    getDeliveries().then(setDeliveries);
    getDeliveriesOverview().then(setOverview);
    getCurrentUserProfile().then(setUserInfos);
  }, []);
  console.log(deliveries);
  console.log(overview);
  console.log(userInfos);

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
