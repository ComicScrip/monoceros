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
              <h2>Temperature*</h2>
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
            <div className={newProductStyle.item}>
              <h2>Humidity*</h2>
              <div className={newProductStyle.itemBlocks}>
                <div className={newProductStyle.quantityBlock}>
                  <input
                    type="number"
                    placeholder="Min"
                    min={0}
                    max={100}
                    step={1}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min={0}
                    max={100}
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
            <div className={newProductStyle.item}>
              <h2>Light.*</h2>
              <div className={newProductStyle.itemBlocks}>
                <div className={newProductStyle.quantityBlock}>
                  <input
                    type="number"
                    placeholder="Max"
                    min={0}
                    max={4000}
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
            <div className={newProductStyle.item}>
              <h2>Vibrations*</h2>
              <div className={newProductStyle.itemBlocks}>
                <div className={newProductStyle.quantityBlock}>
                  <input
                    type="number"
                    placeholder="Max"
                    min={0}
                    max={25}
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
            <div className={newProductStyle.item}>
              <h2>Orientation</h2>
              <div className={newProductStyle.itemBlocks}>
                <div className={newProductStyle.quantityBlock}>
                  <select>
                    <option value=""></option>
                    <option value="X">X</option>
                    <option value="Y">Y</option>
                    <option value="Z">Z</option>
                  </select>
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
            <div className={newProductStyle.item}>
              <div className={newProductStyle.itemBlocks}>
                <h2>Unit cost (€)</h2>
                <div className={newProductStyle.quantityBlock}>
                  <input type="number" placeholder="Min" min={0} step={0.01} />
                </div>
              </div>
              <div className={newProductStyle.itemBlocks}>
                <h2>Lead time (days)</h2>
                <div className={newProductStyle.quantityBlock}>
                  <input type="number" placeholder="Min" min={0} step={1} />
                </div>
              </div>
            </div>
            <button type="button">Add new product</button>
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
