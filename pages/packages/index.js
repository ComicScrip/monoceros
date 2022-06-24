import Meta from "../../components/meta";
import PackagesList from "../../components/packagesList";
import Layout from "../../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Packages = () => {
  return (
    <>
      <Layout>
        <Meta pagetitle="Monoceros - Packages Catalogue" />
        <div className="flex justify-center flex-col items-center">
          <PackagesList />
        </div>
      </Layout>
    </>
  );
};

export default Packages;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "navbar",
        "productsCatalogue",
        "packagesCatalogue",
      ])),
    },
  };
}
