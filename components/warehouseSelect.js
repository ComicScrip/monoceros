import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getWarehouses } from "../lib/productsAPI";

export default function WarehouseSelect({
  warehouses,
  selectWharehouse,
  warehouse,
  setCurrentPage,
}) {
  const router = useRouter();
  const [warehouseFromQuery, setWarshouseFromQuery] = useState("");

  console.log(warehouses);
  console.log(warehouse);
  /*
  const test = warehouses.filter(
    (w) => w.id === parseFloat(router.query.warehouse)
  )[0].name;
*/
  function handleClick() {
    selectWharehouse("");
    setCurrentPage(1);
    //setWarshouseFromQuery("");
  }

  function handleSelectChange(e) {
    selectWharehouse(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex h-7 w-[90vw]">
        <select
          type="search"
          onChange={(e) => handleSelectChange(e)}
          value={warehouse}
          className="bg-white w-[90vw] h-7 mb-5"
          style={{ fontSize: "10px" }}
        >
          <option value="" className="text-gray-300" disabled hidden>
            {"warehouse"}
          </option>
          {warehouses.map((warehouses) => (
            <option key={warehouses.id} value={warehouses.id}>
              {warehouses.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleClick()}
          className="ml-3 text-white text-l border-white border-2 w-7"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          ✗
        </button>
      </div>
    </>
  );
}
