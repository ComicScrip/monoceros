import { FiPackage } from "react-icons/fi";
import { useEffect, useState } from "react";
import { oneDelivery } from "../lib";

export default function DeliveryPath({ id }) {
  const [path, setPath] = useState({});
  useEffect(() => {
    async function request() {
      const getData = await oneDelivery(id);
      setPath(getData.data.delivery_path.shipment_paths);
    }
    request();
  }, []);

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
    <div className="mt-10 bg-white flex flex-col items-center justify-between h-[15vh] w-[90%] text-xs mb-10">
      <div className="w-[80%] h-1 bg-[#e16565] relative top-[50%]"></div>
      <h1 className="text-[#e16565] font-bold ml-5 text-lg self-start">{id}</h1>
      <div className="flex justify-between items-center h-[15vh] w-[90%]">
        <div className="bg-white flex flex-col items-center">
          <FiPackage style={{ fontSize: "2.5em", color: "black" }} />
          <p className="mt-2 text-[#e16565]">{steps[0]}</p>
        </div>
        {steps.slice(1, steps.lenght).map((step, _) => (
          <div
            key={_}
            className="flex flex-col min-w-[10%] min-h-[10%] items-center z-10"
          >
            <p
              key={_}
              className="h-4 w-4 bg-white rounded-full border-2 border-[#e16565]"
            ></p>
            <p className="mt-2 text-[#e16565]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
