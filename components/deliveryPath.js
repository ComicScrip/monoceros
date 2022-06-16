import { FiPackage } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getDeliveryOverview } from "../lib/deliveriesAPI";

export default function DeliveryPath({ id }) {
  const [path, setPath] = useState({});
  const [actualStep, setActualStep] = useState(3);

  useEffect(() => {
    async function request() {
      const getData = await getDeliveryOverview(id);
      setPath(getData.delivery_path.shipment_paths);
      setActualStep(getData.step);
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
    <div className="flex flex-col items-center justify-between h-[15vh] w-[95%] text-[10px] min-w-[400px]">
      <div className="w-[70%] h-[2px] bg-[#e16565] relative top-[35%]"></div>
      <div className="flex justify-between items-center h-[15vh] w-[90%] border-2">
        <div className="flex flex-col items-center mr-5">
          <FiPackage style={{ fontSize: "2.5em", color: "black" }} />
          <p className="mt-2 text-[#e16565]">{steps[0]}</p>
        </div>
        {steps.slice(1, steps.lenght).map((step, index) => (
          <div
            key={index}
            className="flex flex-col min-w-[10%] min-h-[10%] items-center z-10"
          >
            <p
              key={index}
              className={
                actualStep > index + 1
                  ? "h-3 w-3 rounded-full bg-[#e16565]"
                  : "h-3 w-3 rounded-full border-[1px] border-[#e16565] bg-white"
              }
            ></p>
            <p className="mt-2 text-[#e16565]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
