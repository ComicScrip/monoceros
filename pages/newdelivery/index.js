import Layout from "../../components/layout";
import Meta from "../../components/meta";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import NewDeliveryForm from "../../components/newDeliveryForm";

const NewDelivery = () => {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <Meta pagetitle="Monoceros - New Delivery" />
      <NewDeliveryForm />
    </Layout>
  );
};

export default NewDelivery;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "home",
        "navbar",
        "newDeliveryForm",
      ])),
    },
  };
}
