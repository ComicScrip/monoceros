import React, { useEffect, useState } from "react";
import { getWarehouses } from "../lib/productsAPI";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { getDeliveryPath } from "../lib/deliveriesAPI";
import BasiqSelect from "./basiqSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "next-i18next";

export default function NewDeliveryForm() {
  const { t } = useTranslation("newDeliveryForm");
  const [warehouseOrigin, setWarehouseOrigin] = useState("");
  const [warehouseDestination, setWarehouseDestination] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [packageToShip, setPackagesToShip] = useState({});
  const [numberOfPackages, setNumberOfPackages] = useState(1);
  const [deliveryPath, setDeliveryPath] = useState("");
  const [deliveryPathOption, setDeliveryPathOption] = useState([]);
  const [infos, setInfos] = useState({
    startDate: "",
    endDate: "",
    trackingNumber: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const deliveryInfo = {
      path: deliveryPath,
      origin: warehouseOrigin,
      destination: warehouseDestination,
      package: packageToShip,
      ...infos,
    };
    console.log(deliveryInfo);
    setInfos({ startDate: "", endDate: "", trackingNumber: "" });
    setPackagesToShip({});
    setNumberOfPackages(1);
    setWarehouseDestination("");
    setWarehouseOrigin("");
    setDeliveryPath("");
    toast(t("toast"));
  }

  async function getWarehousesList() {
    const warehousesList = await getWarehouses();
    setWarehouses(warehousesList.data);
  }

  async function getPath() {
    if (warehouseOrigin && warehouseDestination) {
      const path = await getDeliveryPath(warehouseOrigin, warehouseDestination);
      setDeliveryPathOption(path);
    }
  }

  useEffect(() => {
    getWarehousesList();
    getPath();
  }, [warehouseOrigin, warehouseDestination, numberOfPackages]);

  return (
    <>
      <h1 className="font-bold text-xl ml-3 text-center text-main_color">
        {t("mainTitle")}
      </h1>
      <div className="flex justify-center mt-5 w-[100vw]">
        <div className="border-t-[0.5px] border-[#C5C5C5] w-[60vw] h-[100vh] flex flex-col items-center">
          <p className="text-center mt-3 mb-5 font-bold">{t("title")}</p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex flex-col mb-5">
              <label>{t("origin")}</label>
              <BasiqSelect
                setState={setWarehouseOrigin}
                items={warehouses}
                value={warehouseOrigin}
                defaultValue={t("warehouseSelect")}
                keyOne={"name"}
                keyTwo={"name"}
              />
            </div>
            <div className="flex flex-col mb-5">
              <label>{t("destination")}</label>
              <BasiqSelect
                setState={setWarehouseDestination}
                items={warehouses}
                value={warehouseDestination}
                defaultValue={t("warehouseSelect")}
                keyOne={"name"}
                keyTwo={"name"}
              />
            </div>
            <div className="flex flex-col mb-5">
              <label>{t("path")}</label>
              <BasiqSelect
                setState={setDeliveryPath}
                items={deliveryPathOption}
                value={deliveryPath}
                defaultValue={t("pathSelect")}
                keyOne={"name"}
                keyTwo={"name"}
              />
            </div>
            <div className="flex flex-col mb-5">
              <label>{t("startDate")}</label>
              <div className="flex flex-initial items-center">
                <DatePicker
                  selected={infos.startDate}
                  onChange={(date) => setInfos({ ...infos, startDate: date })}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  className="p-[4px] w-[60vw] mt-2 rounded"
                />
                <BsFillCalendar2WeekFill
                  style={{
                    color: "var(--main-color)",
                    marginLeft: "-20px",
                    marginTop: "5px",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label>{t("endDate")}</label>
              <div className="flex flex-initial items-center">
                <DatePicker
                  selected={infos.endDate}
                  onChange={(date) => setInfos({ ...infos, endDate: date })}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  className="p-[4px] w-[60vw] mt-2 rounded"
                />
                <BsFillCalendar2WeekFill
                  style={{
                    color: "var(--main-color)",
                    marginLeft: "-20px",
                    marginTop: "5px",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <label>{t("tracking")}</label>
              <input
                className="p-[4px] w-[60vw] mt-2 rounded"
                type="number"
                onChange={(e) =>
                  setInfos({ ...infos, trackingNumber: e.target.value })
                }
                value={infos.trackingNumber}
                required
              />
            </div>
            <div className="w-[60vw] bg-[#C5C5C5] h-[1px] mt-8 mb-3"></div>
            <p className="text-center mt-3 mb-5 font-bold">{t("shipping")}</p>
            <div className="flex flex-col mb-5">
              <label>{t("toShip")}</label>
              {new Array(numberOfPackages).fill().map((_, i) => (
                <div key={i}>
                  <input
                    type="number"
                    className="bg-white p-[4px] w-[60vw] mt-2 rounded"
                    onChange={(e) =>
                      setPackagesToShip({
                        ...packageToShip,
                        [i + 1]: e.target.value,
                      })
                    }
                    value={packageToShip[i + 1] || ""}
                    required
                  />
                </div>
              ))}
            </div>
            <p
              onClick={() => setNumberOfPackages(numberOfPackages + 1)}
              className="underline mt-3"
            >
              {t("addPackage")}
            </p>
            <button
              type="submit"
              className="text-white font-bold py-2 px-4 rounded mt-10 bg-main_color"
            >
              {t("button")}
            </button>
          </form>
        </div>
        <Toaster
          position="top-center"
          containerStyle={{}}
          toastOptions={{
            duration: 2500,
            style: {
              background: "var(--main-bg-color)",
              color: "var(--main-color)",
            },
          }}
        />
      </div>
    </>
  );
}
