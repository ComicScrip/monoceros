import React from "react";
import Meta from "../../components/meta";
import DeliveryList from "../../components/deliveryList";
import { getDeliveriesList } from "../../lib/deliveriesAPI";
import deliveriesStyle from "../../styles/deliveries.module.css";

const Deliveries = ({ allDeliveries }) => {
  return (
    <>
      <Meta pagetitle="Monoceros - Deliveries Overview" />
      <main>
        <h1 className={deliveriesStyle.head}>DELIVERIES OVERVIEW</h1>
        <DeliveryList allDeliveries={allDeliveries} />
      </main>
    </>
  );
};

export default Deliveries;

export async function getStaticProps() {
  const access_token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0Njg2ODUyLCJqdGkiOiI3YzEwNWU0MWQ0NTQ0NTY2OGU1YWI1NDIzMzRkYWI5MyIsInVzZXJfaWQiOjEwMH0.8FkfuI8SiTgcR4_oXJtbxTyfMcGfTf_iM8aL1_GwbJ4";
  const allDeliveries = await getDeliveriesList(access_token);
  return {
    props: {
      allDeliveries,
    },
  };
}
