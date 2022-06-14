import { useEffect, useState } from "react";
import { getDeliveriesOverview } from "../lib";

export default function DeliveriesStatus() {
  const [overview, setOverview] = useState({});
  useEffect(() => {
    async function request() {
      const getData = await getDeliveriesOverview();
      setOverview(getData.data);
    }
    request();
  }, []);

  const { total, in_progress, delayed, completed } = overview;
  const containerWidth = 70;
  const unit = containerWidth / total;
  const inProgressWidth = Math.ceil(unit * in_progress);
  const delayedWidth = Math.ceil(unit * delayed);
  const completedWidth = Math.ceil(unit * completed);

  return (
    <div className="flex justify-center  bg-white text-xs w-[90%] mx-auto rounded p-5">
      <div className="flex flex-col w-[85%]">
        <h1 className="mb-[15px] font-bold self-start">My deliveries</h1>
        <div className="mb-[15px] flex items-center justify-between">
          <p>In progress</p>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth}%] h-[10px] rounded`}
          >
            <div
              style={{ width: `${inProgressWidth}%` }}
              className="h-[10px] bg-red-600 rounded flex justify-end"
            >
              <span className="relative bottom-5 text-red-600">
                {in_progress}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-between">
          <p>Delayed</p>
          <div
            className={`bg-[#eae5e5] w-[${containerWidth}%] h-[10px] rounded`}
          >
            <div
              style={{ width: `${delayedWidth}%` }}
              className="h-[10px] bg-red-600 rounded flex justify-end"
            >
              <span className="relative bottom-5 text-red-600">{delayed}</span>
            </div>
          </div>
        </div>
        <div className="mb-[15px] flex items-center justify-between">
          <p>Completed</p>
          <div className="bg-[#eae5e5] w-[70%] h-[10px] rounded ">
            <div
              style={{ width: `${completedWidth}%` }}
              className="h-[10px] bg-red-600 rounded flex justify-end"
            >
              <span className="relative bottom-5 text-red-600">
                {completed}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Total</p>
          <span className="text-red-600 w-[70%]">{total}</span>
        </div>
      </div>
    </div>
  );
}
