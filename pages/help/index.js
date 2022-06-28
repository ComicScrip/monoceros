import Image from "next/image";
import Meta from "../../components/meta";
import Layout from "../../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Help = () => {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <Meta pagetitle="Monoceros - Help" />
      <h1>Help</h1>
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
        />
        <p>{t("description")}</p>
      </div>
    </Layout>
  );
};

export default Help;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home", "navbar"])),
    },
  };
}
