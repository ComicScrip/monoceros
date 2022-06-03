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
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MjcwOTc4LCJqdGkiOiJlNDliMGZlYzU4M2Q0YTc4YjNlMTEwZTBkNDg3NjVjOCIsInVzZXJfaWQiOjEwMH0.Gym3BX2XawiWettAH3I0RmxKNWfVxMWOPMtUhJWJ1i8";
  const allDeliveries = await getDeliveriesList(access_token);
  return {
    props: {
      allDeliveries,
    },
  };
}
