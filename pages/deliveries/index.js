import Image from "next/image";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Deliveries = () => {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <Meta pagetitle="Monoceros - Deliveries Overview" />
      <h1>Deliveries Overview</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          priority
          src="/images/enconstruction.png"
          height={200}
          width={200}
          alt="en construction"
          style={{ zIndex: -1 }}
        />
        <p>{t("description")}</p>
      </div>
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
