import React, { useEffect, useState } from "react";
import BasiqSelect from "./basiqSelect";
import { getAllProducts } from "../lib/productsAPI";
import { getAllSensorNotAssigned } from "../lib/sensorDataAPI";

export default function SelectManually({
  setRoute,
  setValue,
  title,
  route,
  btnText,
  value,
  type,
}) {
  const [selectOption, setSelectOption] = useState([]);

  async function getSelectOption() {
    if (type === "product") {
      const res = await getAllProducts(100, 0);
      setSelectOption(res.data.results);
    } else if (type === "sensor") {
      const res = await getAllSensorNotAssigned();
      setSelectOption(res);
    }
  }

  useEffect(() => {
    getSelectOption();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <p className="font-[900] text-xl text-main_color mb-3">{title}</p>
        <BasiqSelect
          setState={setValue}
          items={selectOption}
          value={value}
          defaultValue={type === "sensor" ? "Select sensor" : "Select product"}
          keyOne={type === "sensor" ? "sensor_id" : "id"}
          keyTwo={type === "sensor" ? "sensor_id" : "name"}
        />
        <button
          onClick={() => {
            setRoute(route);
          }}
          className=" bg-white border-[1px] w-[215px] py-3 px-4 rounded-md border-black mt-8"
        >
          {btnText}
        </button>
      </div>
    </>
  );
}
