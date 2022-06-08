import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import DeliveryList from "../../components/deliveryList";
import deliveriesStyle from "../../styles/deliveries.module.css";
import { getDeliveries } from "../../lib/deliveriesAPI";

const Deliveries = () => {
  const [allDeliveries, setAllDeliveries] = useState([]);
  useEffect(() => {
    getDeliveries().then(setAllDeliveries);
  }, []);
  return (
    <>
      <Meta pagetitle="Monoceros - Deliveries Overview" />
      <Layout>
        <h1 className={deliveriesStyle.head}>DELIVERIES OVERVIEW</h1>
        <DeliveryList allDeliveries={allDeliveries} />
      </Layout>
    </>
  );
};

export default Deliveries;
