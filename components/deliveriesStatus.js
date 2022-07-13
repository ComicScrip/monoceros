import { useEffect, useState } from "react";
import { getDeliveriesStatus, getDeliveriesAlert } from "../lib/deliveriesAPI";
import { useTranslation } from "next-i18next";

export default function DeliveriesStatus({
  setStatus,
  setCurrentPage,
  status,
}) {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("deliveries");
  const [overview, setOverview] = useState({});
  const { total, in_progress, delayed, completed } = overview;
  const [alertsCount, setAlertsCount] = useState(0);
  const containerWidth = 70;
  const unit = containerWidth / total + 1;
  const inProgressWidth = Math.ceil(unit * in_progress);
  const delayedWidth = Math.ceil(unit * delayed);
  const completedWidth = Math.ceil(unit * completed);
  const alertsWidth = Math.ceil(unit * alertsCount);
  const categories = [
    t("inProgress"),
    t("delayed"),
    t("completed"),
    t("alerts"),
  ];
  const categoriesRates = [
    inProgressWidth,
    delayedWidth,
    completedWidth,
    alertsWidth,
  ];
  const categoriesValues = [in_progress, delayed, completed, alertsCount];
  const categoriesString = [
    "In%20progress",
    "Delayed",
    "Completed",
    "alerts",
    "Total",
  ];
  useEffect(() => {
    async function request() {
      const getAlertsCount = await getDeliveriesAlert();
      setAlertsCount(getAlertsCount.count);
      const getData = await getDeliveriesStatus();
      setOverview(getData.data);
      setLoading(false);
    }
    request();
  }, []);

  return (
    <div className="flex justify-center  bg-white text-xs w-[90%] mx-auto rounded mt-5 p-5 max-w-[700px]">
      {!loading ? (
        <div className="flex flex-col w-[90%] bg-main-bg-color">
          <h1 className="mb-[15px] font-bold self-start text-base text-center">
            {t("myDeliveries")}
          </h1>
          {categories.map((item, index) => (
            <div
              key={index}
              className="mb-[15px] flex items-center justify-between"
            >
              <button
                onClick={() => {
                  setStatus(categoriesString[index]);
                  setCurrentPage(1);
                }}
                className="text-white font-bold py-2 px-4 w-[30%] rounded text-[10px] bg-main_color min-w-[100px]"
                style={{
                  color: status === categoriesString[index] ? "black" : null,
                  fontSize: status === categoriesString[index] ? "1em" : null,
                }}
              >
                {item}
              </button>
              <div className="bg-main_bg_color w-[70%] h-[10px] rounded-r">
                <div
                  style={{
                    width: `${categoriesRates[index]}%`,
                  }}
                  className="h-[10px] flex justify-end bg-main_color"
                >
                  <span className="relative bottom-5 text-main_color">
                    {categoriesValues[index]}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setStatus(categoriesString[4]);
              setCurrentPage(1);
            }}
            className="text-white font-bold py-2 px-4 w-[30%] rounded text-[10px] bg-main_color min-w-[100px]"
            style={{
              color: status === categoriesString[4] ? "black" : null,
              fontSize: status === categoriesString[4] ? "1em" : null,
            }}
          >
            All
          </button>
        </div>
      ) : null}
    </div>
  );
}
