import React, { useEffect, useState } from "react";
import { getWarehouses } from "../lib/productsAPI";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

function SelectComponent({ setState, items, value, defaultValue, keyVal }) {
  return (
    <select
      onChange={(e) => setState(e.target.value)}
      value={value}
      className="bg-white p-[4px] w-[60vw] mt-2 rounded"
      required
    >
      <option value="" className="text-gray-300" disabled hidden>
        {defaultValue}
      </option>
      {items.map((item, _) => (
        <option key={_} value={item.id}>
          {item[keyVal]}
        </option>
      ))}
    </select>
  );
}

export default function NewDeliveryForm() {
  const [warehouseOrigin, setWarehouseOrigin] = useState("");
  const [warehouseDestination, setWarehouseDestination] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [packageToShip, setPackagesToShip] = useState({});
  const [numberOfPackages, setNumberOfPackages] = useState(1);
  const [infos, setInfos] = useState({
    startDate: "",
    endDate: "",
    trackingNumber: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const deliveryInfo = {
      origin: warehouseOrigin,
      destination: warehouseDestination,
      package: packageToShip,
    };
    console.log(deliveryInfo);
    setInfos({ startDate: "", endDate: "", trackingNumber: "" });
    setPackagesToShip({});
    setNumberOfPackages(1);
    setWarehouseDestination("");
    setWarehouseOrigin("");
    toast("Delivery created !");
  }

  async function getWarehousesList() {
    const warehousesList = await getWarehouses();
    setWarehouses(warehousesList.data);
  }

  useEffect(() => {
    getWarehousesList();
  }, [warehouseOrigin, warehouseDestination, numberOfPackages]);

  return (
    <div className="flex justify-center mt-5 w-[100vw]">
      <div className="border-t-[0.5px] border-[#C5C5C5] w-[60vw] h-[100vh] flex flex-col items-center">
        <p className="text-center mt-3 mb-5 font-bold">Delivery path</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex flex-col mb-5">
            <label>Warehouse origin*</label>
            <SelectComponent
              setState={setWarehouseOrigin}
              items={warehouses}
              value={warehouseOrigin}
              defaultValue={"Select Warehouse"}
              keyVal={"name"}
              type={"warehouse"}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label>Warehouse destination*</label>
            <SelectComponent
              setState={setWarehouseDestination}
              items={warehouses}
              value={warehouseDestination}
              defaultValue={"Select Warehouse"}
              keyVal={"name"}
              type={"warehouse"}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label>Start date*</label>
            <div className="flex flex-initial items-center">
              <input
                className="p-[4px] w-[60vw] mt-2 rounded"
                type="text"
                onChange={(e) =>
                  setInfos({ ...infos, startDate: e.target.value })
                }
                value={infos.startDate}
                required
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
            <label>End date*</label>
            <div className="flex flex-initial items-center">
              <input
                className="p-[4px] w-[60vw] mt-2 rounded"
                type="text"
                onChange={(e) =>
                  setInfos({ ...infos, endDate: e.target.value })
                }
                value={infos.endDate}
                required
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
            <label>Tracking number*</label>
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
          <div className="w-[60vw] bg-[#C5C5C5] h-[0.5px] mt-8"></div>
          <p className="text-center mt-3 mb-5 font-bold">Shipping</p>
          <div className="flex flex-col mb-5">
            <label>Package(s) to ship*</label>
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
            + Add another package
          </p>
          <button
            type="submit"
            className="text-white font-bold py-2 px-4 rounded mt-10"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            Create delivery
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
  );
}
