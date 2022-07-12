import { useState, useEffect } from "react";
import Pagination from "./pagination";
import Loading from "./loading";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  getAlarmsByCountryWarehouseAndProduct,
  postAlarmsSolveWarning,
} from "../lib/alarmsAPI";
import { MdLightMode, MdWaterDrop } from "react-icons/md";
import { RiTempColdLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiHandcuffed } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import alarmsStyle from "../styles/alarms.module.css";
import moment from "moment";
import {
  getAllCountries,
  getProductsByCountryAndWarehouse,
  getWarehouses,
} from "../lib/productsAPI";
import CustomSelect from "./customSelect";
import toast, { Toaster } from "react-hot-toast";
import PopupAlert from "./popupAlert";
import PopupResolve from "./popupResolve";

function AlarmsList() {
  const { t } = useTranslation("alarms");
  const router = useRouter();
  const [countrySelect, setCountrySelect] = useState(
    router.query.country || ""
  );
  const [warehouseSelect, setWareHouseSelect] = useState(
    router.query.warehouse || ""
  );
  const [productSelect, setProductSelect] = useState(
    router.query.product || ""
  );
  const [deliveryIdSelect, setdeliveryIdSelect] = useState(
    router.query.deliveryId || ""
  );
  const [packageIdSelect, setPackageIdSelect] = useState(
    router.query.packageId || ""
  );
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [alarmId, setAlarmId] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page) || 1
  );
  const [numberOfAlarms, setNumberOfAlarms] = useState(null);
  const [openPopupAlert, setOpenPopupAlert] = useState(false);
  const [openPopupResolve, setOpenPopupResolve] = useState(false);

  const alarmsPerPage = 10;

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        warehouse: warehouseSelect,
        country: countrySelect,
        product: productSelect,
        page: currentPage,
        deliveryId: deliveryIdSelect,
        packageId: packageIdSelect,
      },
    });
    async function request() {
      const data = await getAlarmsByCountryWarehouseAndProduct(
        alarmsPerPage,
        (currentPage - 1) * alarmsPerPage,
        countrySelect,
        warehouseSelect,
        productSelect,
        deliveryIdSelect,
        packageIdSelect
      );
      const warehouses = await getWarehouses(countrySelect, productSelect);
      const countries = await getAllCountries();
      const products = await getProductsByCountryAndWarehouse(
        countrySelect,
        warehouseSelect
      );
      setWarehousesList(warehouses.data);
      setCountriesList(countries.data);
      setNumberOfAlarms(data.count);
      setAlarms(data.results);
      setProductsList(products.data.results);
    }
    request();
  }, [currentPage, countrySelect, warehouseSelect, productSelect]);

  async function handleClick() {
    await router.replace({
      query: {
        ...router.query,
        warehouse: "",
        country: "",
        product: "",
        page: 1,
        deliveryId: "",
        packageId: "",
      },
    });
    window.location.reload();
  }

  const [alarmsList, setAlarmsList] = useState([]);

  async function handleSubmit(e) {
    const warning_id = [];
    alarmsList.forEach((element) => warning_id.push(element.id));
    e.preventDefault();
    try {
      await postAlarmsSolveWarning(warning_id);
      toast.success("Action résolu", {
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

  return (
    <>
      <Toaster />
      {alarmsList.map((alarm) => (
        <PopupResolve
          key={alarm.id}
          isOpen={openPopupResolve}
          setIsOpen={setOpenPopupResolve}
          deliveryNumber={alarm.delivery_id}
          packageId={alarm.package}
          handleSubmit={handleSubmit}
          message={""}
        />
      ))}
      {alarms
        .filter((alarm) => alarm.id === alarmId)
        .map((alarm) => (
          <PopupAlert
            key={alarm.id}
            isOpen={openPopupAlert}
            setIsOpen={setOpenPopupAlert}
            deliveryNumber={alarm.delivery_id}
            alertTemp={
              alarm.issue_temp ? (
                <RiTempColdLine
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            alertHumidity={
              alarm.issue_humidity ? (
                <MdWaterDrop
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            alertShock={
              alarm.issue_shock ? (
                <AiOutlineDashboard
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            alertLight={
              alarm.issue_light ? (
                <MdLightMode
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            alertOrientation={
              alarm.issue_orientation ? (
                <GiCardboardBoxClosed
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            alertEta={
              alarm.issue_eta ? (
                <FaCalendarAlt
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            alertExpdate={
              alarm.issue_expdate ? (
                <FaCalendarAlt
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            alertTheft={
              alarm.theft ? (
                <GiHandcuffed
                  size={20}
                  style={{ color: "#ff455a", display: "inline-block" }}
                />
              ) : (
                ""
              )
            }
            date={moment(alarm.date).format("DD-MM-yyyy")}
            time={moment(alarm.date).subtract(1, "hours").format("LT")}
            action={alarm.action_taken === "N" ? t("no") : t("yes")}
            contactName={alarm.contact_name}
            messages={alarm.message}
          />
        ))}
      <div className="flex flex-col items-center w-[95] mb-10">
        <CustomSelect
          items={countriesList}
          handleSelectItem={setCountrySelect}
          selectItem={countrySelect}
          defaultValue={t("country")}
          setCurrentPage={setCurrentPage}
          keyOne={"country"}
          keyTwo={"country"}
        />
        <CustomSelect
          items={warehousesList}
          handleSelectItem={setWareHouseSelect}
          selectItem={warehouseSelect}
          defaultValue={t("warehouse")}
          setCurrentPage={setCurrentPage}
          keyOne={"id"}
          keyTwo={"name"}
        />
        <CustomSelect
          items={productsList}
          handleSelectItem={setProductSelect}
          selectItem={productSelect}
          defaultValue={t("product")}
          setCurrentPage={setCurrentPage}
          keyOne={"id"}
          keyTwo={"name"}
        />
      </div>
      {deliveryIdSelect !== "" && packageIdSelect !== "" ? (
        <>
          <p>
            {t("alertFor")} {deliveryIdSelect} / {t("package")}{" "}
            {packageIdSelect}
          </p>
          <button
            className={alarmsStyle.buttonShow}
            type="button"
            onClick={() => {
              handleClick();
            }}
          >
            {t("showAll")}
          </button>
        </>
      ) : (
        ""
      )}
      {alarms.length !== 0 ? (
        <div className="overflow-x-scroll w-[100%]">
          <table className={alarmsStyle.table}>
            <thead>
              <tr>
                <th className={alarmsStyle.tHeader}></th>
                <th className={alarmsStyle.tHeader}>{t("delivery")}</th>
                <th className={alarmsStyle.tHeader}>{t("alarms")}</th>
                <th className={alarmsStyle.tHeader}>Date</th>
                <th className={alarmsStyle.tHeader}>{t("time")}</th>
                <th className={alarmsStyle.tHeader}>{t("action")}</th>
                <th className={alarmsStyle.tHeader}>{t("contactName")}</th>
                <th className={alarmsStyle.tHeader}>{t("messages")}</th>
              </tr>
            </thead>
            <tbody>
              {alarms.map((alarm) => (
                <tr key={alarm.id} className={"bg-white"}>
                  <td
                    className={alarmsStyle.tCell + " " + alarmsStyle.tCellLeft}
                  >
                    <input
                      type="checkbox"
                      className={alarmsStyle.checkbox}
                      id={`custom-checkbox-${alarm.id}`}
                      name={alarm.id}
                      onChange={(e) => {
                        e.target.checked
                          ? setAlarmsList((prevState) => {
                              return [...prevState, alarm];
                            })
                          : setAlarmsList(
                              alarmsList.filter((a) => a.id !== alarm.id)
                            );
                      }}
                    />
                  </td>
                  <td
                    className={alarmsStyle.tCell}
                    onClick={() => {
                      setAlarmId(alarm.id);
                      setOpenPopupAlert(true);
                    }}
                  >
                    {alarm.delivery_id}
                  </td>
                  <td
                    className={alarmsStyle.tCell}
                    onClick={() => {
                      setAlarmId(alarm.id);
                      setOpenPopupAlert(true);
                    }}
                  >
                    <div
                      className="flex justify-center"
                      onClick={() => {
                        setAlarmId(alarm.id);
                        setOpenPopupAlert(true);
                      }}
                    >
                      {alarm.issue_temp ? (
                        <RiTempColdLine
                          size={20}
                          style={{ color: "#ff455a" }}
                        />
                      ) : (
                        ""
                      )}
                      {alarm.issue_humidity ? (
                        <MdWaterDrop size={20} style={{ color: "#ff455a" }} />
                      ) : (
                        ""
                      )}
                      {alarm.issue_shock ? (
                        <AiOutlineDashboard
                          size={20}
                          style={{ color: "#ff455a" }}
                        />
                      ) : (
                        ""
                      )}
                      {alarm.issue_light ? (
                        <MdLightMode size={20} style={{ color: "#ff455a" }} />
                      ) : (
                        ""
                      )}
                      {alarm.issue_orientation ? (
                        <GiCardboardBoxClosed
                          size={20}
                          style={{ color: "#ff455a" }}
                        />
                      ) : (
                        ""
                      )}
                      {alarm.issue_eta || alarm.issue_expdate ? (
                        <FaCalendarAlt size={20} style={{ color: "#ff455a" }} />
                      ) : (
                        ""
                      )}
                      {alarm.theft ? (
                        <GiHandcuffed size={20} style={{ color: "#ff455a" }} />
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                  <td
                    className={alarmsStyle.tCell + " " + alarmsStyle.dateCell}
                    onClick={() => {
                      setAlarmId(alarm.id);
                      setOpenPopupAlert(true);
                    }}
                  >
                    {moment(alarm.date).format("DD-MM-yyyy")}
                  </td>
                  <td
                    className={alarmsStyle.tCell + " " + alarmsStyle.dateCell}
                    onClick={() => {
                      setAlarmId(alarm.id);
                      setOpenPopupAlert(true);
                    }}
                  >
                    {moment(alarm.date).subtract(1, "hours").format("LT")}
                  </td>
                  <td
                    className={alarmsStyle.tCell}
                    onClick={() => {
                      setAlarmId(alarm.id);
                      setOpenPopupAlert(true);
                    }}
                  >
                    {alarm.action_taken === "N" ? t("no") : t("yes")}
                  </td>
                  <td
                    className={alarmsStyle.tCell}
                    onClick={() => {
                      setAlarmId(alarm.id);
                      setOpenPopupAlert(true);
                    }}
                  >
                    {alarm.contact_name}
                  </td>
                  <td
                    className={alarmsStyle.tCell + " " + alarmsStyle.tCellRight}
                    onClick={() => {
                      setAlarmId(alarm.id);
                      setOpenPopupAlert(true);
                    }}
                  >
                    <div className="overflow-y-scroll h-8 min-w-[200px]">
                      {alarm.message}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (!alarms.length && warehouseSelect) ||
        (!alarms.length && countrySelect) ||
        (!alarms.length && productSelect) ||
        (!alarms.length && deliveryIdSelect) ||
        (!alarms.length && packageIdSelect) ? (
        <div className="flex items-center justify-center bg-white w-[90vw] h-16">
          <p style={{ color: "var(--main-color)" }}>{t("noData")}</p>
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center w-full mt-3 bg-main_bg_color">
        <Pagination
          index={Math.ceil(numberOfAlarms / alarmsPerPage)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setOpenPopupResolve(true);
          }}
          className={alarmsStyle.buttonResolve}
        >
          {t("solveAlert")}
        </button>
      </div>
    </>
  );
}

export default AlarmsList;
