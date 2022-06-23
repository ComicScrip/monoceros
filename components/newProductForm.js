import Image from "next/image";
import { useTranslation } from "next-i18next";
import newProductStyle from "../styles/newProduct.module.css";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { postOneProduct } from "../lib/productsAPI";
// import { useState } from "react";
import { set, useForm } from "react-hook-form";
import moment from "moment";

const NewProductForm = () => {
  const { t } = useTranslation("newProduct");
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    console.log(data);
    console.log(
      moment("2022-06-22").format(
        'YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."]'
      )
    );
    try {
      await postOneProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className={newProductStyle.title}>{t("title")}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={newProductStyle.content}>
          <div className={newProductStyle.headContent}>
            <label htmlFor="productName">
              Product name*
              <input
                {...register("name")}
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
                    {...register("expiration_date", {
                      setValueAs: (v) => v + "T22:00:00Z",
                    })}
                    type="date"
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
                {...register("not_perishable")}
                type="checkbox"
                id="persishable"
                className={newProductStyle.checkbox}
                value={(e) => e.target.value + "T22:00:00Z"}
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
                    {...register("temperature_min")}
                    type="number"
                    placeholder="Min"
                    min={-40}
                    max={85}
                    step={1}
                  />
                  <input
                    {...register("temperature_max")}
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
                      {...register("temperature_constraint")}
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
                    {...register("humidity_min")}
                    type="number"
                    placeholder="Min"
                    min={0}
                    max={100}
                    step={1}
                  />
                  <input
                    {...register("humidity_max")}
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
                      {...register("humidity_constraint")}
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
                  {...register("light_max")}
                  type="number"
                  placeholder="Max"
                  min={0}
                  max={4000}
                  step={1}
                  className={newProductStyle.itemBlockOneOnlyInput}
                />
                <label htmlFor="trackable">
                  <input
                    {...register("light_constraint")}
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
                  {...register("shock_max")}
                  type="number"
                  placeholder="Max"
                  min={0}
                  max={25}
                  step={1}
                  className={newProductStyle.itemBlockOneOnlyInput}
                />
                <label htmlFor="trackable">
                  <input
                    {...register("shock_constraint")}
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
                <select
                  className={newProductStyle.itemBlockOneOnlyInput}
                  {...register("orientation_cfg")}
                >
                  <option value=""></option>
                  <option value="X">X</option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
                </select>
                <label htmlFor="trackable">
                  <input
                    {...register("orientation_constraint")}
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
                  <input
                    {...register("unit_cost")}
                    type="number"
                    placeholder="Min"
                    min={0}
                    step={0.01}
                  />
                </div>
              </div>
              <div className={newProductStyle.itemBlocks}>
                <h3 className={newProductStyle.itemTitleBottom}>
                  Lead time (days)
                </h3>
                <div className={newProductStyle.quantityBlockBottom}>
                  <input
                    {...register("lead_time_average")}
                    type="number"
                    placeholder="Min"
                    min={0}
                    step={1}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className={newProductStyle.addButton}>
              Add new product
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProductForm;
