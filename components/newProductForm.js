import Image from "next/image";
import { useTranslation } from "next-i18next";
import newProductStyle from "../styles/newProduct.module.css";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import postOneProduct from "../lib/productsAPI";

const NewProductForm = () => {
  const { t } = useTranslation("newProduct");
  return (
    <>
      <h1 className={newProductStyle.title}>{t("title")}</h1>
      <form>
        <div className={newProductStyle.content}>
          <div className={newProductStyle.headContent}>
            <label htmlFor="productName">
              Product name*
              <input
                type="text"
                id="productName"
                className={newProductStyle.productNameInput}
              />
            </label>
            <label htmlFor="expirationDate">
              Expiration date*
              <div className={newProductStyle.headExpInput}>
                <div className={newProductStyle.calendarInput}>
                  <input
                    type="text"
                    id="expirationDate"
                    className={newProductStyle.productExpInput}
                    placeholder=""
                  />
                  <BsFillCalendar2WeekFill
                    style={{ marginLeft: "-25px", color: "#e77981" }}
                  />
                </div>
                <button type="button" style={{ margin: "auto" }}>
                  <Image
                    src="/images/help-logo-red.svg"
                    alt="help"
                    width={25}
                    height={25}
                    style={{ minWidth: "25px" }}
                  />
                </button>
              </div>
            </label>
            <label htmlFor="perishable">
              <input
                type="checkbox"
                id="persishable"
                className={newProductStyle.checkbox}
              />
              Non perishable
            </label>
          </div>
          <h2 className={newProductStyle.conditionsTitle}>
            Conditions boundaries
          </h2>
          <div className={newProductStyle.conditions}>
            <div className={newProductStyle.item}>
              <h3 className={newProductStyle.itemTitle}>Temperature*</h3>
              <div>
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
                </div>
                <div className={newProductStyle.tracked}>
                  <label htmlFor="trackable" style={{ marginRight: "10px" }}>
                    <input
                      type="checkbox"
                      id="trackable"
                      className={newProductStyle.checkbox}
                    />
                    Not to be tracked
                  </label>
                  <button type="button" style={{ margin: "auto 0" }}>
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
              <h3 className={newProductStyle.itemTitle}>Humidity*</h3>
              <div>
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
                </div>
                <div className={newProductStyle.tracked}>
                  <label htmlFor="trackable" style={{ marginRight: "10px" }}>
                    <input
                      type="checkbox"
                      id="trackable"
                      className={newProductStyle.checkbox}
                    />
                    Not to be tracked
                  </label>
                  <button type="button" style={{ margin: "auto 0" }}>
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
              <h3 className={newProductStyle.itemTitle}>Light.*</h3>
              <div className={newProductStyle.itemBlockOneOnly}>
                <input
                  type="number"
                  placeholder="Max"
                  min={0}
                  max={4000}
                  step={1}
                  className={newProductStyle.itemBlockOneOnlyInput}
                />
                <label htmlFor="trackable">
                  <input
                    type="checkbox"
                    id="trackable"
                    className={newProductStyle.checkbox}
                  />
                  Not to be tracked
                </label>
                <button type="button" style={{ margin: "auto 0" }}>
                  <Image
                    src="/images/help-logo-red.svg"
                    alt="help"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>
            <div className={newProductStyle.item}>
              <h3 className={newProductStyle.itemTitle}>Vibrations*</h3>
              <div className={newProductStyle.itemBlockOneOnly}>
                <input
                  type="number"
                  placeholder="Max"
                  min={0}
                  max={25}
                  step={1}
                  className={newProductStyle.itemBlockOneOnlyInput}
                />
                <label htmlFor="trackable">
                  <input
                    type="checkbox"
                    id="trackable"
                    className={newProductStyle.checkbox}
                  />
                  Not to be tracked
                </label>
                <button type="button" style={{ margin: "auto 0" }}>
                  <Image
                    src="/images/help-logo-red.svg"
                    alt="help"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>
            <div className={newProductStyle.item}>
              <h3 className={newProductStyle.itemTitle}>Orientation</h3>
              <div className={newProductStyle.itemBlockOneOnly}>
                <select className={newProductStyle.itemBlockOneOnlyInput}>
                  <option value=""></option>
                  <option value="X">X</option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
                </select>
                <label htmlFor="trackable">
                  <input
                    type="checkbox"
                    id="trackable"
                    className={newProductStyle.checkbox}
                  />
                  Not to be tracked
                </label>
                <button type="button" style={{ margin: "auto 0" }}>
                  <Image
                    src="/images/help-logo-red.svg"
                    alt="help"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>
            <div className={newProductStyle.itemBottom}>
              <div className={newProductStyle.itemBlocks}>
                <h3 className={newProductStyle.itemTitleBottom}>
                  Unit cost (€)
                </h3>
                <div className={newProductStyle.quantityBlockBottom}>
                  <input type="number" placeholder="Min" min={0} step={0.01} />
                </div>
              </div>
              <div className={newProductStyle.itemBlocks}>
                <h3 className={newProductStyle.itemTitleBottom}>
                  Lead time (days)
                </h3>
                <div className={newProductStyle.quantityBlockBottom}>
                  <input type="number" placeholder="Min" min={0} step={1} />
                </div>
              </div>
            </div>
            <button type="button" className={newProductStyle.addButton}>
              Add new product
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProductForm;
