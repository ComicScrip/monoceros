import { useEffect, useState } from "react";
import { getDeliveriesStatus } from "../lib/deliveriesAPI";

export default function DeliveriesStatus() {
  const [overview, setOverview] = useState({});
  useEffect(() => {
    async function request() {
      const getData = await getDeliveriesStatus();
      setOverview(getData.data);
    }
    request();
  }, []);

  const { total, in_progress, delayed, completed } = overview;
  const containerWidth = 70;
  const unit = containerWidth / total + 1;
  const inProgressWidth = Math.ceil(unit * in_progress);
  const delayedWidth = Math.ceil(unit * delayed);
  const completedWidth = Math.ceil(unit * completed);

  return (
    <div className="flex justify-center  bg-white text-xs w-[90%] mx-auto rounded p-5 max-w-[500px]">
      <div
        className="flex flex-col w-[85%]"
        style={{ color: "var(--main-color)" }}
      >
        <h1 className="mb-[15px] font-bold self-start">My deliveries</h1>
        <div className="mb-[15px] flex items-center justify-between">
          <p>In progress</p>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth}%] h-[10px] rounded`}
          >
            <div
              style={{
                width: `${inProgressWidth}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] rounded flex justify-end"
            >
              <span className="relative bottom-5">{in_progress}</span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-between">
          <p>Delayed</p>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth}%] h-[10px] rounded`}
          >
            <div
              style={{
                width: `${delayedWidth}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] bg-red-600 rounded flex justify-end"
            >
              <span className="relative bottom-5">{delayed}</span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-between">
          <p>Completed</p>
          <div className="bg-[#eae5e5] w-[70%] h-[10px] rounded ">
            <div
              style={{
                width: `${completedWidth}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] bg-red-600 rounded flex justify-end"
            >
              <span className="relative bottom-5 ">{completed}</span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-between">
          <p>Alert</p>
          <div className="bg-[#eae5e5] w-[70%] h-[10px] rounded ">
            <div
              style={{
                width: `${20}%`,
                backgroundColor: "var(--main-color)",
              }}
              className="h-[10px] bg-red-600 rounded flex justify-end"
            >
              <span className="relative bottom-5 ">5</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Total</p>
          <div className="font-bold text-m w-[70%]">
            <p className="w-5 text-black">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
