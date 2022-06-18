import { useEffect, useState } from "react";
import {
  getAllCountries,
  getWarehouses,
  getProductsByCountryAndWarehouse,
} from "../lib/productsAPI";
import CountrySelect from "./countrySelect";
import WarehouseSelect from "./warehouseSelect";
import Pagination from "./pagination";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function ProductsList() {
  const { t } = useTranslation("products");
  const router = useRouter();
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [numberOfProducts, setNumberOfProducts] = useState(null);
  const [countrySelect, setCountrySelect] = useState(
    router.query.country || ""
  );
  const [warehouseSelect, setWareHouseSelect] = useState(
    router.query.warehouse || ""
  );

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        warehouse: warehouseSelect,
        country: countrySelect,
      },
    });
    async function request() {
      const products = await getProductsByCountryAndWarehouse(
        countrySelect || "",
        warehouseSelect || "",
        productsPerPage,
        (currentPage - 1) * (productsPerPage + 1)
      );
      setNumberOfProducts(products.data.count);
      setProducts(products.data.results);
      const warehouses = await getWarehouses(countrySelect || "");
      setWarehousesList(warehouses.data);
      const countries = await getAllCountries();
      setCountriesList(countries.data);
    }
    request();
    console.log(warehousesList);
  }, [countrySelect, warehouseSelect, currentPage]);
  const tableHead = [
    t("product"),
    t("expiration"),
    t("temp"),
    t("humidity"),
    t("lum"),
    t("shock"),
    t("orientation"),
    t("cost"),
    t("delay"),
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
            {t("title")}
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
        <div className="w-[95vw] bg-white flex flex-col items-center">
          <div
            className="overflow-x-scroll w-[100%]"
            style={{ backgroundColor: "var(--main-bg-color)" }}
          >
            <table data-cy={"products-table"} className="w-[95vw]">
              <tbody className="bg-white">
                <tr
                  className="text-[0.6rem] font-bold"
                  style={{ backgroundColor: "var(--main-bg-color)" }}
                >
                  <td className="min-w-[80px] absolute bg-[#efefef]">
                    <span>{tableHead[0]}</span>
                  </td>
                  <td></td>
                  {tableHead.slice(1, 9).map((item) => (
                    <td className="min-w-[100px]" key={item}>
                      {item}
                    </td>
                  ))}
                </tr>
                {products.map((product, _) => (
                  <tr
                    key={_}
                    className="border-8 font-bold text-[10px] h-16"
                    style={{ borderColor: "var(--main-bg-color)" }}
                  >
                    <td className="min-w-[80px]"></td>
                    <td
                      style={{ color: "var(--main-color)" }}
                      className="min-w-[90px] bg-white absolute flex items-center justify-center text-[0.7rem] left-2 h-14"
                    >
                      <span>{product.name}</span>
                    </td>
                    <td className="min-w-[90px]">
                      {product.expiration_date
                        ? product.expiration_date.slice(0, 10)
                        : ""}
                    </td>
                    <td data-cy={"temp-scale"} className="min-w-[90px]">
                      {product.temperature_min} / {product.temperature_max}
                    </td>
                    <td className="min-w-[70px]">
                      {product.humidity_min} / {product.humidity_max}
                    </td>
                    <td className="min-w-[70px]">
                      {product.light_min} / {product.light_max}
                    </td>
                    <td className="min-w-[70px]">
                      {product.shock_min} / {product.shock_max}
                    </td>
                    <td className="min-w-[70px]">{product.orientation_cfg}</td>
                    <td className="min-w-[70px]">{product.unit_cost}</td>
                    <td className="min-w-[70px]">
                      {product.lead_time_average
                        ? product.lead_time_average
                        : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length < 1 ? (
            <div className="flex items-center justify-center bg-white w-[90vw] h-16">
              <p>No products</p>
            </div>
          ) : null}
          {Math.ceil(numberOfProducts / productsPerPage) > 1 ? (
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
          ) : null}
        </div>
      </div>
    </>
  );
}
