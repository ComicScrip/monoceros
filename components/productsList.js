import { useEffect, useState } from "react";
import {
  getAllProducts,
  getAllCountries,
  getWarehouses,
  getProductsByCountry,
  getProductsByCountryAndWarehouse,
  getProductsByWarehouse,
} from "../lib";
import CountrySelect from "./countrySelect";
import WarehouseSelect from "./warehouseSelect";

export default function ProductsList() {
  const [countrySelect, setCountrySelect] = useState("");
  const [warehouseSelect, setWareHouseSelect] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function request() {
      if (!warehouseSelect && !countrySelect) {
        const products = await getAllProducts();
        setProducts(products.data.results);
        const warehouses = await getWarehouses();
        setWarehousesList(warehouses.data);
        const countries = await getAllCountries();
        setCountriesList(countries.data);
      } else if (countrySelect && !warehouseSelect) {
        const warehousesList = await getWarehouses(countrySelect);
        setWarehousesList(warehousesList.data);
        const products = await getProductsByCountry(countrySelect);
        setProducts(products.data.results);
      } else if (warehouseSelect && !countrySelect) {
        const products = await getProductsByWarehouse(warehouseSelect);
        setProducts(products.data.results);
      } else if (warehouseSelect && countrySelect) {
        const warehousesList = await getWarehouses(countrySelect);
        setWarehousesList(warehousesList.data);
        const products = await getProductsByCountryAndWarehouse(
          countrySelect,
          warehouseSelect
        );
        setProducts(products.data.results);
      }
    }
    request();
  }, [countrySelect, warehouseSelect]);
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
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-2xl w-full font-bold mb-5 text-[#e16565]">
          Products catalogue
        </h1>
        <div className="flex flex-col items-center">
          <CountrySelect
            selectName={"Country"}
            countries={countriesList}
            selectCountry={setCountrySelect}
            country={countrySelect}
          />
          <WarehouseSelect
            selectName={"Warehouse"}
            warehouses={warehousesList}
            selectWharehouse={setWareHouseSelect}
            warehouse={warehouseSelect}
          />
        </div>
      </div>
      <div className="w-[95vw] bg-white ">
        <table className="w-[100%] overflow-scroll">
          <tbody>
            <tr className="bg-[#efefef] text-center">
              {tableHead.map((item) => (
                <td key={item}>{item}</td>
              ))}
            </tr>
            {products.map((product, _) => (
              <tr
                key={_}
                className="border-y-[15px] collapse h-24 border-[#efefef] text-center"
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
                <td>
                  {product.lead_time_average ? product.lead_time_average : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length < 1 ? (
          <div className="flex items-center justify-center bg-white w-[90vw] h-24 ">
            <p>No products</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
