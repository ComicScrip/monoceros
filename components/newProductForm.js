import Image from "next/image";
import { useTranslation } from "next-i18next";
import "react-datepicker/dist/react-datepicker.css";
import newProductStyle from "../styles/newProduct.module.css";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { postOneProduct } from "../lib/productsAPI";
import DatePicker from "react-datepicker";
import { useState } from "react";
import PopupProduct from "./popupProduct";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

const NewProductForm = () => {
  const { t } = useTranslation("newProduct");
  const defaultState = {
    name: "",
    expiration_date: null,
    not_perishable: false,
    temperature_min: "",
    temperature_max: "",
    temperature_constraint: true,
    humidity_min: "",
    humidity_max: "",
    humidity_constraint: true,
    light_max: "",
    light_constraint: true,
    shock_max: "",
    shock_constraint: true,
    orientation_cfg: "",
    orientation_constraint: false,
    unit_cost: 0,
    lead_time_average: 0,
  };
  const [formInfos, setFormInfos] = useState(defaultState);
  const [openPopup, setOpenPopup] = useState({
    perishable: false,
    temperature: false,
    humidity: false,
    light: false,
    shock: false,
    orientation: false,
  });

  const [fakeDate, setFakeDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postOneProduct(formInfos);
      setFormInfos(defaultState);
      toast.success("Produit ajouté avec succès", {
        style: {
          border: "1px solid #ff455a",
          padding: "16px",
          color: "#ff455a",
        },
        iconTheme: {
          primary: "#ff455a",
          secondary: "#FFFAEE",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const textPopup = [
    t("popupPerishable"),
    t("popupTemp"),
    t("popupHumidity"),
    t("popupLight"),
    t("popupShock"),
    t("popupOrientation"),
  ];

  return (
    <>
      <div>
        <Toaster />
      </div>
      <h1 className={newProductStyle.title}>{t("title")}</h1>
      <form onSubmit={handleSubmit}>
        <div className={newProductStyle.content}>
          <div className={newProductStyle.headContent}>
            <label htmlFor="productName">
              {t("productName")}*
              <input
                type="text"
                id="productName"
                className={newProductStyle.productNameInput}
                value={formInfos.name}
                onChange={(e) =>
                  setFormInfos({ ...formInfos, name: e.target.value })
                }
                required
              />
            </label>
            <label htmlFor="expirationDate">
              {t("expirationDate")}*
              <div className={newProductStyle.headExpInput}>
                <div className={newProductStyle.calendarInput}>
                  <DatePicker
                    selected={fakeDate}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    onChange={(date) => {
                      setFakeDate(date);
                      setFormInfos({
                        ...formInfos,
                        expiration_date:
                          moment(date).format("YYYY-MM-DDTHH:mm"),
                      });
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={formInfos.not_perishable ? "" : fakeDate}
                    className={newProductStyle.productExpInput}
                    disabled={formInfos.not_perishable ? true : false}
                    required={!formInfos.not_perishable ? true : false}
                  />
                  <BsFillCalendar2WeekFill
                    style={{
                      marginLeft: "-25px",
                      color: "#e77981",
                      zIndex: "10",
                    }}
                  />
                </div>
                <button
                  type="button"
                  style={{ margin: "auto" }}
                  onClick={() =>
                    setOpenPopup({
                      ...openPopup,
                      perishable: !openPopup.perishable,
                    })
                  }
                >
                  {openPopup.perishable && <PopupProduct text={textPopup[0]} />}
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
                id="perishable"
                className={newProductStyle.checkbox}
                checked={formInfos.not_perishable}
                onChange={() =>
                  setFormInfos({
                    ...formInfos,
                    not_perishable: !formInfos.not_perishable,
                  })
                }
              />
              {t("nonPerishable")}
            </label>
          </div>
          <h2 className={newProductStyle.conditionsTitle}>
            {t("conditionsBoundaries")}
          </h2>
          <div className={newProductStyle.conditions}>
            <div className={newProductStyle.item}>
              <h3 className={newProductStyle.itemTitle}>{t("temperature")}*</h3>
              <div>
                <div className={newProductStyle.quantityBlock}>
                  <input
                    type="number"
                    placeholder="Min"
                    min={-40}
                    max={85}
                    step={1}
                    className={newProductStyle.minMaxInput}
                    style={{
                      color: !formInfos.temperature_constraint ? "white" : "",
                    }}
                    value={formInfos.temperature_min}
                    onChange={(e) =>
                      setFormInfos({
                        ...formInfos,
                        temperature_min: parseInt(e.target.value),
                      })
                    }
                    disabled={!formInfos.temperature_constraint ? true : false}
                    required={formInfos.temperature_constraint ? true : false}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min={-40}
                    max={85}
                    step={1}
                    style={{
                      color: !formInfos.temperature_constraint ? "white" : "",
                    }}
                    className={newProductStyle.minMaxInput}
                    value={formInfos.temperature_max}
                    onChange={(e) =>
                      setFormInfos({
                        ...formInfos,
                        temperature_max: parseInt(e.target.value),
                      })
                    }
                    disabled={!formInfos.temperature_constraint ? true : false}
                    required={formInfos.temperature_constraint ? true : false}
                  />
                </div>
                <div className={newProductStyle.tracked}>
                  <label
                    htmlFor="tempTrackable"
                    style={{ marginRight: "10px" }}
                  >
                    <input
                      type="checkbox"
                      id="tempTrackable"
                      className={newProductStyle.checkbox}
                      checked={!formInfos.temperature_constraint}
                      onChange={() =>
                        setFormInfos({
                          ...formInfos,
                          temperature_constraint:
                            !formInfos.temperature_constraint,
                          temperature_max: 85,
                          temperature_min: -40,
                        })
                      }
                    />
                    {t("notToBeTracked")}
                  </label>
                  <button
                    type="button"
                    style={{ margin: "auto 0" }}
                    onClick={() =>
                      setOpenPopup({
                        ...openPopup,
                        temperature: !openPopup.temperature,
                      })
                    }
                  >
                    {openPopup.temperature && (
                      <PopupProduct text={textPopup[1]} />
                    )}
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
              <h3 className={newProductStyle.itemTitle}>{t("humidity")}*</h3>
              <div>
                <div className={newProductStyle.quantityBlock}>
                  <input
                    type="number"
                    placeholder="Min"
                    min={0}
                    max={100}
                    step={1}
                    style={{
                      color: !formInfos.humidity_constraint ? "white" : "",
                    }}
                    className={newProductStyle.minMaxInput}
                    value={formInfos.humidity_min}
                    onChange={(e) =>
                      setFormInfos({
                        ...formInfos,
                        humidity_min: parseInt(e.target.value),
                      })
                    }
                    disabled={!formInfos.humidity_constraint ? true : false}
                    required={formInfos.humidity_constraint ? true : false}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min={0}
                    max={100}
                    step={1}
                    style={{
                      color: !formInfos.humidity_constraint ? "white" : "",
                    }}
                    className={newProductStyle.minMaxInput}
                    value={formInfos.humidity_max}
                    onChange={(e) =>
                      setFormInfos({
                        ...formInfos,
                        humidity_max: parseInt(e.target.value),
                      })
                    }
                    disabled={!formInfos.humidity_constraint ? true : false}
                    required={formInfos.humidity_constraint ? true : false}
                  />
                </div>
                <div className={newProductStyle.tracked}>
                  <label
                    htmlFor="humidityTrackable"
                    style={{ marginRight: "10px" }}
                  >
                    <input
                      type="checkbox"
                      id="humidityTrackable"
                      className={newProductStyle.checkbox}
                      checked={!formInfos.humidity_constraint}
                      onChange={() =>
                        setFormInfos({
                          ...formInfos,
                          humidity_constraint: !formInfos.humidity_constraint,
                          humidity_min: 0,
                          humidity_max: 100,
                        })
                      }
                    />
                    {t("notToBeTracked")}
                  </label>
                  <button
                    type="button"
                    style={{ margin: "auto 0" }}
                    onClick={() =>
                      setOpenPopup({
                        ...openPopup,
                        humidity: !openPopup.humidity,
                      })
                    }
                  >
                    {openPopup.humidity && <PopupProduct text={textPopup[2]} />}
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
              <h3 className={newProductStyle.itemTitle}>{t("light")}*</h3>
              <div className={newProductStyle.itemBlockOneOnly}>
                <input
                  type="number"
                  placeholder="Max"
                  min={0}
                  max={4000}
                  step={1}
                  style={{
                    color: !formInfos.light_constraint ? "white" : "",
                  }}
                  className={newProductStyle.itemBlockOneOnlyInput}
                  value={formInfos.light_max}
                  onChange={(e) =>
                    setFormInfos({
                      ...formInfos,
                      light_max: parseInt(e.target.value),
                    })
                  }
                  disabled={!formInfos.light_constraint ? true : false}
                  required={formInfos.light_constraint ? true : false}
                />
                <label htmlFor="lightTrackable">
                  <input
                    type="checkbox"
                    id="lightTrackable"
                    className={newProductStyle.checkbox}
                    checked={!formInfos.light_constraint}
                    onChange={() =>
                      setFormInfos({
                        ...formInfos,
                        light_constraint: !formInfos.light_constraint,
                        light_max: 4000,
                      })
                    }
                  />
                  {t("notToBeTracked")}
                </label>
                <button
                  type="button"
                  style={{ margin: "auto 0" }}
                  onClick={() =>
                    setOpenPopup({
                      ...openPopup,
                      light: !openPopup.light,
                    })
                  }
                >
                  {openPopup.light && <PopupProduct text={textPopup[3]} />}
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
              <h3 className={newProductStyle.itemTitle}>{t("vibrations")}*</h3>
              <div className={newProductStyle.itemBlockOneOnly}>
                <input
                  type="number"
                  placeholder="Max"
                  min={0}
                  max={25}
                  step={1}
                  style={{
                    color: !formInfos.shock_constraint ? "white" : "",
                  }}
                  className={newProductStyle.itemBlockOneOnlyInput}
                  value={formInfos.shock_max}
                  onChange={(e) =>
                    setFormInfos({
                      ...formInfos,
                      shock_max: parseInt(e.target.value),
                    })
                  }
                  disabled={!formInfos.shock_constraint ? true : false}
                  required={formInfos.shock_constraint ? true : false}
                />
                <label htmlFor="shockTrackable">
                  <input
                    type="checkbox"
                    id="shockTrackable"
                    className={newProductStyle.checkbox}
                    checked={!formInfos.shock_constraint}
                    onChange={() =>
                      setFormInfos({
                        ...formInfos,
                        shock_constraint: !formInfos.shock_constraint,
                        shock_max: 25,
                      })
                    }
                  />
                  {t("notToBeTracked")}
                </label>
                <button
                  type="button"
                  style={{ margin: "auto 0" }}
                  onClick={() =>
                    setOpenPopup({
                      ...openPopup,
                      shock: !openPopup.shock,
                    })
                  }
                >
                  {openPopup.shock && <PopupProduct text={textPopup[4]} />}
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
                  className={
                    newProductStyle.itemBlockOneOnlyInput +
                    " " +
                    newProductStyle.orientationInput
                  }
                  value={formInfos.orientation_cfg}
                  onChange={(e) =>
                    setFormInfos({
                      ...formInfos,
                      orientation_cfg: e.target.value,
                    })
                  }
                  disabled={!formInfos.orientation_constraint ? true : false}
                  required={formInfos.orientation_constraint ? true : false}
                >
                  <option value=""></option>
                  <option value="X">X</option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
                </select>
                <label htmlFor="orientationTrackable">
                  <input
                    type="checkbox"
                    id="orientationTrackable"
                    className={newProductStyle.checkbox}
                    checked={!formInfos.orientation_constraint}
                    onChange={() =>
                      setFormInfos({
                        ...formInfos,
                        orientation_constraint:
                          !formInfos.orientation_constraint,
                      })
                    }
                  />
                  {t("notToBeTracked")}
                </label>
                <button
                  type="button"
                  style={{ margin: "auto 0" }}
                  onClick={() =>
                    setOpenPopup({
                      ...openPopup,
                      orientation: !openPopup.orientation,
                    })
                  }
                >
                  {openPopup.orientation && (
                    <PopupProduct text={textPopup[5]} />
                  )}
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
                  {t("unitCost")} (€)
                </h3>
                <div className={newProductStyle.quantityBlockBottom}>
                  <input
                    type="number"
                    placeholder="Min"
                    min={0}
                    step={0.01}
                    value={formInfos.unit_cost}
                    onChange={(e) =>
                      setFormInfos({
                        ...formInfos,
                        unit_cost: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className={newProductStyle.itemBlocks}>
                <h3 className={newProductStyle.itemTitleBottom}>
                  {t("leadTime")}
                </h3>
                <div className={newProductStyle.quantityBlockBottom}>
                  <input
                    type="number"
                    placeholder="Min"
                    min={0}
                    step={1}
                    value={formInfos.lead_time_average}
                    onChange={(e) =>
                      setFormInfos({
                        ...formInfos,
                        lead_time_average: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <button type="submit" className={newProductStyle.addButton}>
              {t("addNewProduct")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProductForm;
