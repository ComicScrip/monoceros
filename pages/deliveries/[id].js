import React from "react";
import Layout from "../../components/layout";
import IdComponent from "../../components/idComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
//import { getDeliveries } from "../../lib/deliveriesAPI";
import { myAxiosInstance } from "../../lib/customAxios";

const DeliveryDetail = () => {
  return (
    <Layout>
      <IdComponent />
    </Layout>
  );
};

export default DeliveryDetail;

// export async function getStaticPaths() {
//   async function getDeliveries() {
//     const res = await myAxiosInstance.get(
//       "/api/deliveries/deliveries/?limit=100"
//     );
//     return res.data.results;
//   }
//   const deliveries = getDeliveries();
//   const paths = deliveries.map((a) => ({ params: { id: a.id.toString() } }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

export async function getStaticProps({ locale }) {
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
