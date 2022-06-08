import React from "react";
import dynamic from "next/dynamic";
import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryList from "../components/deliveryList";
import Layout from "../components/layout";

export default function Deliveries() {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });

  return (
    <Layout>
      <h1>DELIVERIES OVERVIEW</h1>
      <div className={deliveriesStyle.map}>
        <MapWithNoSSR />
      </div>
      <DeliveryList />
    </Layout>
  );
}
