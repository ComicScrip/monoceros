import React from "react";
import dynamic from "next/dynamic";
import deliveriesStyle from "../styles/deliveries.module.css";

export default function Deliveries() {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });

  return (
    <main>
      <h1>DELIVERIES OVERVIEW</h1>
      <div className={deliveriesStyle.map}>
        <MapWithNoSSR />
      </div>
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
          <tr>
            <td className={deliveriesStyle.tCell}>12</td>
            <td className={deliveriesStyle.tCell}>In progess</td>
            <td className={deliveriesStyle.tCell}>Vert</td>
            <td className={deliveriesStyle.tCell}>JB</td>
            <td className={deliveriesStyle.tCell}>Bora Bora</td>
            <td className={deliveriesStyle.tCell}>24/05</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
