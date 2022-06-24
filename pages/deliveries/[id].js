import React from "react";
import Layout from "../../components/layout";
import IdComponent from "../../components/idComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DeliveryDetail = () => {
  return (
    <Layout>
      <IdComponent />
    </Layout>
  );
};

export default DeliveryDetail;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "home",
        "navbar",
        "deliveries",
        "packages",
      ])),
    },
  };
}
