import React, { useEffect, useState } from "react";
import { getWarehouses } from "../lib/productsAPI";
import { getPackagesByCountryWarehouseAndId } from "../lib/packagesAPI";

function SelectComponent({ setState, items, value, defaultValue, keyVal }) {
  return (
    <select
      onChange={(e) => setState(e.target.value)}
      value={value}
      className="bg-white p-[4px] w-[60vw] mt-2 rounded"
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
  const [packages, setPackages] = useState([]);
  const [packageToShip, setPackagesToShip] = useState("");
  const [infos, setInfos] = useState({
    start: "",
    end: "",
    trackingNumber: "",
  });

  async function getWarehousesList() {
    const warehousesList = await getWarehouses();
    const packagesList = await getPackagesByCountryWarehouseAndId(
      50,
      0,
      "",
      warehouseOrigin || "",
      ""
    );
    setWarehouses(warehousesList.data);
    setPackages(packagesList.results);
  }

  useEffect(() => {
    getWarehousesList();
  }, [warehouseOrigin, warehouseDestination]);

  return (
    <div className="flex justify-center mt-5 w-[100vw]">
      <div className="border-t-[0.5px] border-[#C5C5C5] w-[60vw] h-[100vh] flex flex-col items-center">
        <p className="text-center mt-3 mb-5 font-bold">Delivery path</p>
        <form className="flex flex-col items-center">
          <div className="flex flex-col mb-5">
            <label>Warehouse origin*</label>

            <SelectComponent
              setState={setWarehouseOrigin}
              items={warehouses}
              value={warehouseOrigin}
              defaultValue={"Select Warehouse"}
              keyVal={"name"}
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
            />
          </div>
          <div className="flex flex-col mb-5">
            <label>Start date*</label>
            <input className="p-[4px] w-[60vw] mt-2 rounded" type="text" />
          </div>
          <div className="flex flex-col mb-5">
            <label>End date*</label>
            <input className="p-[4px] w-[60vw] mt-2 rounded" type="text" />
          </div>
          <div className="flex flex-col mb-5">
            <label>Tracking number*</label>
            <input className="p-[4px] w-[60vw] mt-2 rounded" type="text" />
          </div>
          <div className="w-[60vw] bg-[#C5C5C5] h-[0.5px] mt-8"></div>
          <p className="text-center mt-3 mb-5 font-bold">Shipping</p>
          <div className="flex flex-col mb-5">
            <label>Select packages to ship*</label>

            <SelectComponent
              setState={setPackagesToShip}
              items={packages}
              value={packageToShip}
              defaultValue={"Select Package"}
              keyVal={"id"}
            />
          </div>
          <p className="underline">+ Add another package</p>
          <button
            className="text-white font-bold py-2 px-4 rounded mt-10"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            Create delivery
          </button>
        </form>
      </div>
    </div>
  );
}
