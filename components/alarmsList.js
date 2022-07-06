import { useState, useEffect } from "react";
import Pagination from "./pagination";
import Loading from "./loading";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  getAlarms,
  getAlarmsByCountryWarehouseAndProduct,
} from "../lib/alarmsAPI";
import { MdLightMode, MdWaterDrop } from "react-icons/md";
import { RiTempColdLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiHandcuffed } from "react-icons/gi";
import { BsFillCalendarXFill, BsBoxSeam } from "react-icons/bs";
import alarmsStyle from "../styles/alarms.module.css";
import moment from "moment";
import {
  getAllCountries,
  getProductsByCountryAndWarehouse,
  getWarehouses,
} from "../lib/productsAPI";
import CustomSelect from "./customSelect";

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
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page) || 1
  );

  const alarmsPerPage = 10;
  const [numberOfAlarms, setNumberOfAlarms] = useState(null);

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        warehouse: warehouseSelect,
        country: countrySelect,
        product: productSelect,
        page: currentPage,
      },
    });
    async function request() {
      const data = await getAlarmsByCountryWarehouseAndProduct(
        alarmsPerPage,
        (currentPage - 1) * alarmsPerPage,
        countrySelect,
        warehouseSelect,
        productSelect
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

  return (
    <>
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
      {alarms.length !== 0 ? (
        <table className={alarmsStyle.table}>
          <thead>
            <tr>
              <th className={alarmsStyle.tHeader}></th>
              <th className={alarmsStyle.tHeader}>N° de livraison</th>
              <th className={alarmsStyle.tHeader}>Alertes</th>
              <th className={alarmsStyle.tHeader}>Date</th>
              <th className={alarmsStyle.tHeader}>Heure</th>
              <th className={alarmsStyle.tHeader}>Action</th>
              <th className={alarmsStyle.tHeader}>Nom du contact</th>
              <th className={alarmsStyle.tHeader}>Commentaires</th>
            </tr>
          </thead>
          <tbody>
            {alarms.map((alarm) => (
              <tr key={alarm.id} className="bg-white">
                <td className={alarmsStyle.tCell + " " + alarmsStyle.tCellLeft}>
                  <input type="checkbox" />
                </td>
                <td className={alarmsStyle.tCell}>{alarm.delivery_id}</td>
                <td className={alarmsStyle.tCell}>
                  {alarm.issue_temp ? (
                    <RiTempColdLine size={20} style={{ color: "#ff455a" }} />
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
                    <BsBoxSeam size={20} style={{ color: "#ff455a" }} />
                  ) : (
                    ""
                  )}
                  {alarm.issue_eta ? (
                    <BsFillCalendarXFill
                      size={20}
                      style={{ color: "#ff455a" }}
                    />
                  ) : (
                    ""
                  )}
                  {alarm.theft ? (
                    <GiHandcuffed size={20} style={{ color: "#ff455a" }} />
                  ) : (
                    ""
                  )}
                </td>
                <td className={alarmsStyle.tCell}>
                  {moment(alarm.date).format("DD-MM-yyyy")}
                </td>
                <td className={alarmsStyle.tCell}>
                  {moment(alarm.date).subtract(2, "hours").format("HH:mm")}
                </td>
                <td className={alarmsStyle.tCell}>{alarm.action_taken}</td>
                <td className={alarmsStyle.tCell}>{alarm.contact_name}</td>
                <td
                  className={alarmsStyle.tCell + " " + alarmsStyle.tCellRight}
                >
                  {alarm.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </>
  );
}

export default AlarmsList;
