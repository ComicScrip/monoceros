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
import { useRouter } from "next/router";

export default function ProductsList() {
  const router = useRouter();
  const [countrySelect, setCountrySelect] = useState(
    router.query.country || ""
  );
  const [warehouseSelect, setWareHouseSelect] = useState(
    router.query.warehouse || ""
  );
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [numberOfProducts, setNumberOfProducts] = useState(null);

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        warehouse: warehouseSelect,
        country: countrySelect,
      },
    });
    async function request() {
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
            className="w-full mb-5"
            style={{
              color: "var(--main-color)",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            PRODUCTS CATALOGUE
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
        <div className="w-[95vw] bg-white flex flex-col items-center justify-center">
          {products.map((product, _) => (
            <div
              className="h-16 overflow-x-scroll w-[100%]"
              style={{ backgroundColor: "var(--main-bg-color)" }}
              key={_}
            >
              <table data-cy={"products-table"} className="w-[95vw] h-14">
                <tbody className="bg-white">
                  <tr className="text-[0.6rem]">
                    {tableHead.map((item) => (
                      <td key={item}>{item}</td>
                    ))}
                  </tr>
                  <tr key={_} className="collapse font-bold text-[10px]">
                    <td className="min-w-[120px]">{product.name}</td>
                    <td className="min-w-[90px]">
                      {product.expiration_date
                        ? product.expiration_date.slice(0, 10)
                        : ""}
                    </td>
                    <td data-cy={"temp-scale"} className="min-w-[90px]">
                      {product.temperature_min} / {product.temperature_max}
                    </td>
                    <td className="min-w-[90px]">
                      {product.humidity_min} / {product.humidity_max}
                    </td>
                    <td className="min-w-[90px]">
                      {product.light_min} / {product.light_max}
                    </td>
                    <td className="min-w-[90px]">
                      {product.shock_min} / {product.shock_max}
                    </td>
                    <td className="min-w-[90px]">{product.unit_cost}</td>
                    <td className="min-w-[90px]">
                      {product.lead_time_average
                        ? product.lead_time_average
                        : 0}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {products.length < 1 ? (
            <div className="flex items-center justify-center bg-white w-[90vw] h-16">
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
