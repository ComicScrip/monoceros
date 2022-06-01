import { FiPackage } from "react-icons/fi";

export default function DeliveryPath({ deliveryPath, deliveryId }) {
  const path = [];
  for (const step of deliveryPath) {
    !path.includes(step.origin.name) ? path.push(step.origin.name) : null;
    !path.includes(step.destination.name)
      ? path.push(step.destination.name)
      : null;
  }
  console.log(path);
  return (
    <div className="mt-10 w-full flex flex-col items-center justify-between h-[15vh] text-xs">
      <div className="w-[80%] h-1 bg-[#e16565] relative top-[50%]"></div>
      <h1 className="text-[#e16565] font-bold text-lg self-start">
        {deliveryId}
      </h1>
      <div className="flex justify-between items-center h-[15vh] w-[90%]">
        <div className="bg-white flex flex-col items-center">
          <FiPackage style={{ fontSize: "2.5em", color: "black" }} />
          <p className="mt-2 text-[#e16565]">{path[0]}</p>
        </div>
        {path.slice(1, path.lenght).map((step, _) => (
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
