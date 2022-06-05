/* eslint-disable */

import { useEffect, useState } from "react";
import { allProducts, getAllWarehouses, getAllCountries } from "../lib";
import wharehouseSelect from "./warehouseSelect";
import CountrySelect from "./countrySelect";
import WharehouseSelect from "./warehouseSelect";

export default function ProductsList() {
  const [countrySelect, seCountrySelect] = useState("");
  const [wharehouseSelect, setWarehouseSelect] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function request() {
      if (wharehouseSelect === "" && countrySelect === "") {
        const products = await allProducts();
        setProducts(products.data.results);
        const wharehouses = await getAllWarehouses();
        setWarehousesList(wharehouses.data.results);
        const countries = await getAllCountries();
        setCountriesList(countries.data);
      }
    }
    request();
  }, []);
  console.log(countriesList);
  const tableHead = [
    "Product",
    "Expiration",
    "Temperature (°C)",
    "Humidity (%RH)",
    "Light (𝝺 nm)",
    "Shock (G)",
    "Unit Cost (€)",
    "delay (day(s))",
  ];
  return (
    <>
      <div className="flex flex-col items-center mb-10 w-[90vw] text-center">
        <h1 className="text-xl w-full font-bold mb-5">Catalogue produits</h1>
        <div className="flex flex-col items-center w-[90vw]">
          <CountrySelect selectName={"Country"} countries={countriesList} />
          <WharehouseSelect
            selectName={"Warehouse"}
            wharehouses={warehousesList}
          />
        </div>
      </div>
      <div className="w-[90vw] bg-white">
        <table className="w-[100%]">
          <tbody>
            <tr className="bg-[#efefef]">
              {tableHead.map((item) => (
                <td key={item}>{item}</td>
              ))}
            </tr>
            {products.map((product, _) => (
              <tr
                key={_}
                className="border-y-[15px] collapse h-24 border-[#efefef]"
              >
                <td>{product.name}</td>
                <td>
                  {product.expiration_date
                    ? product.expiration_date.slice(0, 10)
                    : ""}
                </td>
                <td>
                  {product.temperature_min} / {product.temperature_max}
                </td>
                <td>
                  {product.humidity_min} / {product.humidity_max}
                </td>
                <td>
                  {product.light_min} / {product.light_max}
                </td>
                <td>
                  {product.shock_min} / {product.shock_max}
                </td>
                <td>{product.unit_cost}</td>
                {/* <td>{lead_time_average ? lead_time_average : ""}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
