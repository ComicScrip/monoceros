import { useEffect, useState } from "react";
import { getDeliveriesStatus } from "../lib/deliveriesAPI";
import { useTranslation } from "next-i18next";
export default function DeliveriesStatus() {
  const [overview, setOverview] = useState({});
  useEffect(() => {
    async function request() {
      const getData = await getDeliveriesStatus();
      setOverview(getData.data);
    }
    request();
  }, []);
  const { t } = useTranslation("deliveries");
  const { total, in_progress, delayed, completed } = overview;
  const containerWidth = 70;
  const unit = containerWidth / total + 1;
  const inProgressWidth = Math.ceil(unit * in_progress);
  const delayedWidth = Math.ceil(unit * delayed);
  const completedWidth = Math.ceil(unit * completed);

  return (
    <div className="flex justify-center  bg-white text-xs w-[90%] mx-auto rounded mt-5 p-5">
      <div
        className="flex flex-col w-[90%]"
        style={{ color: "var(--main-color)" }}
      >
        <h1 className="mb-[15px] font-bold self-start text-base text-center">
          {t("myDeliveries")}
        </h1>
        <div className="mb-[15px] flex items-center justify-between">
          <button
            className="text-white font-bold py-2 px-4 w-[30%] rounded text-[10px]"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            {t("inProgress")}
          </button>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth.toString()}%] h-[10px] rounded`}
          >
            <div
              style={{
                width: `${inProgressWidth}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] flex justify-end"
            >
              <span className="relative bottom-5">{in_progress}</span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-between">
          <button
            className="text-white font-bold py-2 px-4 w-[30%] rounded text-[10px]"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            {t("delayed")}
          </button>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth.toString()}%] h-[10px] rounded`}
          >
            <div
              style={{
                width: `${delayedWidth}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] flex justify-end"
            >
              <span className="relative bottom-5">{delayed}</span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-around">
          <button
            className="text-white font-bold py-2 px-4 w-[30%] rounded text-[10px]"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            {t("completed")}
          </button>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth.toString()}%] h-[10px] rounded`}
          >
            <div
              style={{
                width: `${completedWidth}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] flex justify-end"
            >
              <span className="relative bottom-5 ">{completed}</span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-between">
          <button
            className="text-white font-bold py-2 px-4 w-[30%] rounded text-[10px]"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            {t("alerts")}
          </button>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth.toString()}%] h-[10px] rounded`}
          >
            <div
              style={{
                width: `${20}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] flex justify-end"
            >
              <span className="relative bottom-5 ">5</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex justify-between w-[30%] font-bold">
            <p>TOTAL</p>
            <div className={`text-m w-[7${containerWidth}%]`}>
              <p className="w-5 ">{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
