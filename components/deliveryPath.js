import { FiPackage } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getDeliveryOverview } from "../lib/deliveriesAPI";
import { FaWarehouse, FaTruck } from "react-icons/fa";

export default function DeliveryPath({ id }) {
  const [path, setPath] = useState([]);
  const [actualStep, setActualStep] = useState(3);
  useEffect(() => {
    async function request() {
      const getData = await getDeliveryOverview(id);
      setPath(getData.delivery_path.shipment_paths);
      setActualStep(getData.step);
      console.log(path.length);
    }
    request();
  }, [id]);
  const steps = [];
  for (let i = 0; i < path.length; i++) {
    !steps.includes(path[i].origin.name)
      ? steps.push(path[i].origin.name)
      : null;
    !steps.includes(path[i].destination.name)
      ? steps.push(path[i].destination.name)
      : null;
  }

  return (
    <div className="w-[80px]">
      <div className="flex items-center justify-between text-[10px] w-[100vw] overflow-x-scroll">
        <div
          className={
            steps.length > 3
              ? "flex justify-center items-center h-[15vh] w-[95vw] min-w-[550px]"
              : "flex justify-center items-center h-[15vh] w-[95vw]"
          }
        >
          <div className="w-[95%] h-[2px] bg-[#e16565] flex justify-between items-center">
            <div className="flex flex-col items-center justify-center bg-[#efefef] pt-5">
              <FiPackage style={{ fontSize: "2em", color: "black" }} />
              <p className="mt-2 text-[#e16565]">{steps[0]}</p>
            </div>
            {steps.slice(1, steps.lenght).map((step, index) => (
              <div
                key={index}
                className={
                  index + 2 === steps.length
                    ? "flex flex-col min-w-[10%] min-h-[10%] items-center z-10 bg-[#efefef]"
                    : "flex flex-col min-w-[10%] min-h-[10%] items-center z-10 pt-6 "
                }
              >
                {index + 2 === steps.length ? (
                  <span className="pt-4">
                    <FaWarehouse style={{ fontSize: "2em", color: "black" }} />
                  </span>
                ) : (
                  <p
                    key={index}
                    className={
                      actualStep > index + 1
                        ? "h-3 w-3 rounded-full bg-[#e16565]"
                        : "h-3 w-3 rounded-full border-[1px] border-[#e16565] bg-white"
                    }
                  >
                    {actualStep === index + 2 ? (
                      <span className=" relative left-10 bottom-2">
                        <FaTruck style={{ fontSize: "2em", color: "black" }} />
                      </span>
                    ) : null}
                  </p>
                )}
                <p
                  className={
                    index % 2 !== 0
                      ? "mt-2 text-[#e16565]"
                      : "mt-2 text-[#e16565] relative bottom-12"
                  }
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
