import { useEffect, useState } from "react";
import {
  getAllProducts,
  getAllCountries,
  getWarehouses,
  getProductsByCountry,
  getProductsByCountryAndWarehouse,
  getProductsByWarehouse,
} from "../lib/productsAPI";
import CountrySelect from "./countrySelect";
import WarehouseSelect from "./warehouseSelect";
import Pagination from "./pagination";

export default function ProductsList() {
  const [countrySelect, setCountrySelect] = useState("");
  const [warehouseSelect, setWareHouseSelect] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [numberOfProducts, setNumberOfProducts] = useState(null);

  async function getProductsNumber() {
    const pnbr = await getAllProducts(50, 0);
    setNumberOfProducts(pnbr.data.count);
  }

  useEffect(() => {
    async function request() {
      //getProductsNumber();
      if (!warehouseSelect && !countrySelect) {
        const products = await getAllProducts(
          productsPerPage,
          (currentPage - 1) * productsPerPage + 1
        );
        setNumberOfProducts(products.data.count);
        setProducts(products.data.results);
        const warehouses = await getWarehouses();
        setWarehousesList(warehouses.data);
        const countries = await getAllCountries();
        setCountriesList(countries.data);
      } else if (countrySelect && !warehouseSelect) {
        const warehousesList = await getWarehouses(countrySelect);
        setWarehousesList(warehousesList.data);
        const products = await getProductsByCountry(
          countrySelect,
          productsPerPage,
          (currentPage - 1) * (productsPerPage + 1)
        );
        setNumberOfProducts(products.data.count);
        setProducts(products.data.results);
      } else if (warehouseSelect && !countrySelect) {
        const products = await getProductsByWarehouse(
          warehouseSelect,
          productsPerPage,
          (currentPage - 1) * (productsPerPage + 1)
        );
        setNumberOfProducts(products.data.count);
        setProducts(products.data.results);
      } else if (warehouseSelect && countrySelect) {
        const warehousesList = await getWarehouses(countrySelect);
        setWarehousesList(warehousesList.data);
        const products = await getProductsByCountryAndWarehouse(
          countrySelect,
          warehouseSelect,
          productsPerPage,
          (currentPage - 1) * (productsPerPage + 1)
        );
        setNumberOfProducts(products.data.count);
        setProducts(products.data.results);
      }
    }
    request();
  }, [countrySelect, warehouseSelect, currentPage]);
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
      <div>
        <div className="flex flex-col h-full items-center mb-10 text-center">
          <h1
            className="text-2xl w-full font-bold mb-5"
            style={{ color: "var(--main-color)" }}
          >
            Products catalogue
          </h1>
          <div className="flex flex-col items-center justify-center w-[95]">
            <CountrySelect
              countries={countriesList}
              selectCountry={setCountrySelect}
              country={countrySelect}
              setCurrentPage={setCurrentPage}
            />
            <WarehouseSelect
              warehouses={warehousesList}
              selectWharehouse={setWareHouseSelect}
              warehouse={warehouseSelect}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <div className="w-[95vw] bg-white flex flex-col justify-around items-center">
          {products.map((product, _) => (
            <div
              className="h-24 overflow-x-scroll w-[100%]"
              style={{ backgroundColor: "var(--main-bg-color)" }}
              key={_}
            >
              <table className="w-[95vw] h-20">
                <tbody className="bg-white">
                  <tr className="text-center text-[0.6rem]">
                    {tableHead.map((item) => (
                      <td key={item}>{item}</td>
                    ))}
                  </tr>
                  <tr
                    key={_}
                    className="collapse text-center font-bold text-[0.8rem]"
                  >
                    <td className="min-w-[150px]">{product.name}</td>
                    <td className="min-w-[150px]">
                      {product.expiration_date
                        ? product.expiration_date.slice(0, 10)
                        : ""}
                    </td>
                    <td className="min-w-[110px]">
                      {product.temperature_min} / {product.temperature_max}
                    </td>
                    <td className="min-w-[110px]">
                      {product.humidity_min} / {product.humidity_max}
                    </td>
                    <td className="min-w-[110px]">
                      {product.light_min} / {product.light_max}
                    </td>
                    <td className="min-w-[110px]">
                      {product.shock_min} / {product.shock_max}
                    </td>
                    <td className="min-w-[110px]">{product.unit_cost}</td>
                    <td className="min-w-[110px]">
                      {product.lead_time_average
                        ? product.lead_time_average
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {products.length < 1 ? (
            <div className="flex items-center justify-center bg-white w-[90vw] h-24 ">
              <p>No products</p>
            </div>
          ) : (
            <div
              className="flex justify-center w-full"
              style={{ backgroundColor: "var(--main-bg-color)" }}
            >
              <Pagination
                index={Math.ceil(numberOfProducts / productsPerPage)}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
