import React from "react";
import DeliveryList from "../../components/deliveryList";
import { getDeliveriesList } from "../../lib/deliveriesAPI";
import deliveriesStyle from "../../styles/deliveries.module.css";

export default function Deliveries({ allDeliveries }) {
  return (
    <main>
      <h1 className={deliveriesStyle.head}>DELIVERIES OVERVIEW</h1>
      <DeliveryList allDeliveries={allDeliveries} />
    </main>
  );
}

export async function getStaticProps() {
  const access_token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MjU2MDQzLCJqdGkiOiI2YTU1MzU0Nzk4ZmM0ZGVlODA2YTk4NDA3Zjk3Nzk3NyIsInVzZXJfaWQiOjEwMH0.k7mourkROTXFTQpJP44DyE8MS15yfURw3HNwhbmkVEI";
  const allDeliveries = await getDeliveriesList(access_token);
  return {
    props: {
      allDeliveries,
    },
  };
}
