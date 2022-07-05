import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import NewProductForm from "../../components/newProductForm";

const NewProduct = () => {
  return (
    <Layout>
      <Meta pagetitle="Monoceros - New Product" />
      <NewProductForm />
    </Layout>
  );
};

export default NewProduct;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "home",
        "navbar",
        "newProduct",
      ])),
    },
  };
}
