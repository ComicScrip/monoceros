import React from "react";
import dynamic from "next/dynamic";
import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryList from "../components/deliveryList";
import { getDeliveriesList } from "../lib/deliveriesAPI";

export default function Deliveries({ allDeliveries }) {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });

  return (
    <main>
      <h1>DELIVERIES OVERVIEW</h1>
      <div className={deliveriesStyle.map}>
        <MapWithNoSSR />
      </div>
      <DeliveryList allDeliveries={allDeliveries} />
    </main>
  );
}

export async function getStaticProps() {
  const access_token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MTg1NjQ4LCJqdGkiOiJkMDQ5OTIxNzRiOWE0NDFjYWNmZDg1ZjgxM2ZjNzEwYyIsInVzZXJfaWQiOjEwMH0.fcCF_p6I1j57zX4j35r6W5Tavk2QRHCM1XqJxscWQ0I";
  const allDeliveries = await getDeliveriesList(access_token);
  return {
    props: {
      allDeliveries,
    },
  };
}
