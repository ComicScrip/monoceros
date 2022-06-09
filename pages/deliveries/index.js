import React from "react";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import DeliveryList from "../../components/deliveryList";
import deliveriesStyle from "../../styles/deliveries.module.css";

const Deliveries = () => {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <Meta pagetitle="Monoceros - Deliveries Overview" />
      <h1 className={deliveriesStyle.head}>DELIVERIES OVERVIEW</h1>
      <DeliveryList />
    </Layout>
  );
};

export default Deliveries;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home", "navbar"])),
    },
  };
}
