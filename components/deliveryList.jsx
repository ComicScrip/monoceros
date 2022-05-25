import deliveriesStyle from "../styles/deliveries.module.css";
import { getDeliveriesList } from "../lib/deliveriesAPI";
import axios from "axios";

const DeliveryList = ({ allDeliveries }) => {
  function getDeliveriesList() {
    const access_token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNDk2NTM1LCJqdGkiOiI2ODIyMGI3ZmE1YTg0OGE0YmY1MjEwNzFmMGVmZGU5MiIsInVzZXJfaWQiOjEwMH0.47H4S01HIv7ozZRWma6_-a6LZ-cZRcyM4GEHMYgs3lU";
    return axios
      .get("https://devbackend.monoceros-sas.com/api/deliveries/deliveries", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => data.results);
  }
  const results = getDeliveriesList();
  console.log("Deliveries List", results);
  console.log("Deliveries List 2", allDeliveries);
  return (
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
        <tr className={deliveriesStyle.tRow}>
          <td className={deliveriesStyle.tCell}>12</td>
          <td className={deliveriesStyle.tCell}>In progess</td>
          <td className={deliveriesStyle.tCell}>Vert</td>
          <td className={deliveriesStyle.tCell}>JB</td>
          <td className={deliveriesStyle.tCell}>Bora Bora</td>
          <td className={deliveriesStyle.tCell}>24/05</td>
        </tr>
        <tr className={deliveriesStyle.tRow}>
          <td className={deliveriesStyle.tCell}>13</td>
          <td className={deliveriesStyle.tCell}>In progess</td>
          <td className={deliveriesStyle.tCell}>Orange</td>
          <td className={deliveriesStyle.tCell}>JB</td>
          <td className={deliveriesStyle.tCell}>Monaco</td>
          <td className={deliveriesStyle.tCell}>25/05</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DeliveryList;

export async function getStaticProps() {
  const allDeliveries = await getDeliveriesList();
  return {
    props: {
      allDeliveries,
    },
  };
}
