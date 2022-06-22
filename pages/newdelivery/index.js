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
      <h1
        className="font-bold text-xl ml-3 text-center"
        style={{ color: "var(--main-color)" }}
      >
        Create new delivery
      </h1>
      <NewDeliveryForm />
    </Layout>
  );
};

export default NewDelivery;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home", "navbar"])),
    },
  };
}
