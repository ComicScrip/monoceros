import Image from "next/image";
import { useTranslation } from "next-i18next";
import "react-datepicker/dist/react-datepicker.css";
import newProductStyle from "../styles/newProduct.module.css";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { postOneProduct } from "../lib/productsAPI";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";

const NewProductForm = () => {
  const { t } = useTranslation("newProduct");
  const { register, handleSubmit, setValue } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [perishableCheck, setPerishableCheck] = useState(false);
  const [tempCheck, setTempCheck] = useState(false);
  const [humidityCheck, setHumidityCheck] = useState(false);
  const [lightCheck, setLightCheck] = useState(false);
  const [shockCheck, setShockCheck] = useState(false);
  const [orientationCheck, setOrientationCheck] = useState(true);

  async function onSubmit(data) {
    try {
      console.log(data);
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
                required
              />
            </label>
            <label htmlFor="expirationDate">
              Expiration date*
              <div className={newProductStyle.headExpInput}>
                <div className={newProductStyle.calendarInput}>
                  <DatePicker
                    {...register("expiration_date")}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    className={newProductStyle.productExpInput}
                    disabled={perishableCheck ? true : false}
                    required={!perishableCheck ? true : false}
                  />
                  <BsFillCalendar2WeekFill
                    style={{
                      marginLeft: "-25px",
                      color: "#e77981",
                      zIndex: "10",
                    }}
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
                id="perishable"
                className={newProductStyle.checkbox}
                onChange={() => setPerishableCheck(!perishableCheck)}
                checked={perishableCheck}
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
                    data
                    disabled={tempCheck ? true : false}
                    required={!tempCheck ? true : false}
                  />
                  <input
                    {...register("temperature_max")}
                    type="number"
                    placeholder="Max"
                    min={-40}
                    max={85}
                    step={1}
                    disabled={tempCheck ? true : false}
                    required={!tempCheck ? true : false}
                  />
                </div>
                <div className={newProductStyle.tracked}>
                  <label
                    htmlFor="tempTrackable"
                    style={{ marginRight: "10px" }}
                  >
                    <input
                      {...register(
                        "temperature_constraint",
                        setValue("temperature_constraint", !tempCheck)
                      )}
                      type="checkbox"
                      id="tempTrackable"
                      className={newProductStyle.checkbox}
                      onChange={() => {
                        setTempCheck(!tempCheck);
                      }}
                      checked={tempCheck}
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
                    disabled={humidityCheck ? true : false}
                    required={!humidityCheck ? true : false}
                  />
                  <input
                    {...register("humidity_max")}
                    type="number"
                    placeholder="Max"
                    min={0}
                    max={100}
                    step={1}
                    disabled={humidityCheck ? true : false}
                    required={!humidityCheck ? true : false}
                  />
                </div>
                <div className={newProductStyle.tracked}>
                  <label
                    htmlFor="humidityTrackable"
                    style={{ marginRight: "10px" }}
                  >
                    <input
                      {...register(
                        "humidity_constraint",
                        setValue("humidity_constraint", !humidityCheck)
                      )}
                      type="checkbox"
                      id="humidityTrackable"
                      className={newProductStyle.checkbox}
                      onChange={() => setHumidityCheck(!humidityCheck)}
                      checked={humidityCheck}
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
                  disabled={lightCheck ? true : false}
                  required={!lightCheck ? true : false}
                />
                <label htmlFor="lightTrackable">
                  <input
                    {...register(
                      "light_constraint",
                      setValue("light_constraint", !lightCheck)
                    )}
                    type="checkbox"
                    id="lightTrackable"
                    className={newProductStyle.checkbox}
                    onChange={() => setLightCheck(!lightCheck)}
                    checked={lightCheck}
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
                  disabled={shockCheck ? true : false}
                  required={!shockCheck ? true : false}
                />
                <label htmlFor="shockTrackable">
                  <input
                    {...register(
                      "shock_constraint",
                      setValue("shock_constraint", !shockCheck)
                    )}
                    type="checkbox"
                    id="shockTrackable"
                    className={newProductStyle.checkbox}
                    onChange={() => setShockCheck(!shockCheck)}
                    checked={shockCheck}
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
                  disabled={orientationCheck ? true : false}
                  required={!orientationCheck ? true : false}
                >
                  <option value=""></option>
                  <option value="X">X</option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
                </select>
                <label htmlFor="orientationTrackable">
                  <input
                    {...register(
                      "orientation_constraint",
                      setValue("orientation_constraint", !orientationCheck)
                    )}
                    type="checkbox"
                    id="orientationTrackable"
                    className={newProductStyle.checkbox}
                    onChange={() => setOrientationCheck(!orientationCheck)}
                    checked={orientationCheck}
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
