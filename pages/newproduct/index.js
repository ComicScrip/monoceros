import Image from "next/image";
import Meta from "../../components/meta";
import Layout from "../../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import newProductStyle from "../../styles/newProduct.module.css";

const NewProduct = () => {
  const { t } = useTranslation("newProduct");
  return (
    <Layout>
      <Meta pagetitle="Monoceros - New Product" />
      <h1 className={newProductStyle.title}>{t("title")}</h1>
      <form>
        <div className={newProductStyle.content}>
          <div className={newProductStyle.headContent}>
            <label htmlFor="productName">
              Product name*
              <input type="text" id="productName" />
            </label>
            <label htmlFor="expirationDate">
              Expiration date*
              <input type="date" id="expirationDate" value="" />
            </label>

            <label htmlFor="perishable">
              <input type="checkbox" id="persishable" />
              Non perishable
            </label>
          </div>
          <p>Conditions boundaries</p>
          <div className={newProductStyle.conditions}>
            <div className={newProductStyle.item}>
              <h2>Temp.*</h2>
              <div className={newProductStyle.itemBlocks}>
                <div className={newProductStyle.quantityBlock}>
                  <input
                    type="number"
                    placeholder="Min"
                    min={-40}
                    max={85}
                    step={1}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min={-40}
                    max={85}
                    step={1}
                  />
                  <label htmlFor="trackable">
                    <input type="checkbox" id="trackable" />
                    Not to be tracked
                  </label>
                  <button type="button">
                    <Image
                      src="/images/help-logo-red.svg"
                      alt="help"
                      width={25}
                      height={25}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
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
