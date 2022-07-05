import { useEffect, useState } from "react";
import {
  getAllCountries,
  getWarehouses,
  getProductsByCountryAndWarehouse,
} from "../lib/productsAPI";
import Pagination from "./pagination";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import CustomSelect from "./customSelect";
import Loading from "./loading";

export default function ProductsList() {
  const { t } = useTranslation("productsCatalogue");
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
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page) || 1
  );
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
      const warehousesList = await getWarehouses(countrySelect);
      const countries = await getAllCountries();
      const products = await getProductsByCountryAndWarehouse(
        countrySelect,
        warehouseSelect,
        productsPerPage,
        (currentPage - 1) * productsPerPage
      );
      setCountriesList(countries.data);
      setNumberOfProducts(products.data.count);
      setWarehousesList(warehousesList.data);
      setProducts(products.data.results);
    }
    request();
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
          <h1 className="w-full mb-5 text-main_color text-[20px] font-[600]">
            {t("title")}
          </h1>
          <div className="flex flex-col items-center justify-center w-[95]">
            <CustomSelect
              items={countriesList}
              handleSelectItem={setCountrySelect}
              selectItem={countrySelect}
              defaultValue={t("country")}
              setCurrentPage={setCurrentPage}
              keyOne={"country"}
              keyTwo={"country"}
            />
            <CustomSelect
              items={warehousesList}
              handleSelectItem={setWareHouseSelect}
              selectItem={warehouseSelect}
              defaultValue={t("warehouse")}
              setCurrentPage={setCurrentPage}
              keyOne={"id"}
              keyTwo={"name"}
            />
          </div>
        </div>
        <div className="w-[95vw] bg-white flex flex-col items-center justify-center">
          {products.length ? (
            <div className="overflow-x-scroll w-[100%] bg-main_bg_color">
              <table data-cy={"products-table"} className="w-[95vw]">
                <tbody className="bg-white">
                  <tr className="text-[0.6rem] font-bold bg-main_bg_color">
                    <td className="min-w-[100px] absolute h-8 bg-main_bg_color">
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
                      className="border-8 font-bold text-[10px] h-16 border-main_bg_color"
                    >
                      <td className="min-w-[100px]"></td>
                      <td className="text-main_color min-w-[120px] bg-white absolute flex items-center justify-center text-[0.7rem] left-2 h-14">
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
                      <td className="min-w-[90px]">
                        {product.humidity_min} / {product.humidity_max}
                      </td>
                      <td className="min-w-[90px]">
                        {product.light_min} / {product.light_max}
                      </td>
                      <td className="min-w-[90px]">
                        {product.shock_min} / {product.shock_max}
                      </td>
                      <td className="min-w-[90px]">X</td>
                      <td className="min-w-[90px]">{product.unit_cost}</td>
                      <td className="min-w-[90px]">
                        {product.lead_time_average
                          ? product.lead_time_average
                          : 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (!products.length && warehouseSelect) ||
            (!products.length && countrySelect) ? (
            <div className="flex items-center justify-center bg-white w-[90vw] h-16">
              <p>No products</p>
            </div>
          ) : (
            <Loading />
          )}
          {Math.ceil(numberOfProducts / productsPerPage) > 1 ? (
            <div className="bg-main_bg_color flex justify-center w-full">
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
