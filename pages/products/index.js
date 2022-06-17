import Meta from "../../components/meta";
import ProductsList from "../../components/productsList";
import Layout from "../../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Products = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Layout>
        <Meta pagetitle="Monoceros - Products Catalogue" />
        <div className="flex justify-center flex-col items-center">
          <ProductsList />
        </div>
      </Layout>
    </>
  );
};

export default Products;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "home",
        "navbar",
        "products",
      ])),
    },
  };
}
