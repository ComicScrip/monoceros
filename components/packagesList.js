import { useEffect, useState } from "react";
import Pagination from "./pagination";
import CountrySelect from "./countrySelect";
import WarehouseSelect from "./warehouseSelect";
import ProductSelect from "./productSelect";
import {
  getPackagesByCountryWarehouseAndId,
  deletePackage,
} from "../lib/packagesAPI";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  getAllCountries,
  getWarehouses,
  getProductsByCountryAndWarehouse,
} from "../lib/productsAPI";

export default function PackagesList() {
  const { t } = useTranslation("packageCatalogue");
  const router = useRouter();
  const [countrySelect, setCountrySelect] = useState(
    router.query.country || ""
  );
  const [warehouseSelect, setWareHouseSelect] = useState(
    router.query.warehouse || ""
  );
  const [productSelect, setProductSelect] = useState(
    router.query.product || ""
  );
  const [countriesList, setCountriesList] = useState([]);
  const [warehousesList, setWarehousesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 10;
  const [numberOfPackages, setNumberOfPackages] = useState(null);

  async function handleDeleteProduct(id) {
    console.log(id);
    const del = await deletePackage(id);
    console.log(del);
  }

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        warehouse: warehouseSelect,
        country: countrySelect,
      },
    });
    async function request() {
      const data = await getPackagesByCountryWarehouseAndId(
        packagesPerPage,
        (currentPage - 1) * (packagesPerPage + 1),
        countrySelect,
        warehouseSelect,
        productSelect
      );
      const warehouses = await getWarehouses(countrySelect, productSelect);
      const countries = await getAllCountries();
      const products = await getProductsByCountryAndWarehouse(
        countrySelect,
        warehouseSelect
      );
      setWarehousesList(warehouses.data);
      setCountriesList(countries.data);
      setNumberOfPackages(data.count);
      setPackages(data.results);
      setProductsList(products.data.results);
    }
    request();
  }, [currentPage, countrySelect, warehouseSelect, productSelect, packages]);
  const tableHead = [
    "ID",
    "Sensor",
    "Product",
    "Size",
    "Pairing start date",
    "Expiry date",
    "Pairing end date",
    "Delete",
  ];
  return (
    <>
      <div className="flex flex-col items-center mb-10 text-center">
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
        <div className="flex flex-col items-center w-[95] mb-10">
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
          <ProductSelect
            products={productsList}
            selectProduct={setProductSelect}
            product={productSelect}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="w-[95vw] bg-white flex flex-col items-center justify-center">
          <div
            className="overflow-x-scroll w-[100%]"
            style={{ backgroundColor: "var(--main-bg-color)" }}
          >
            <table className="w-[95vw]">
              <tbody className="bg-white">
                <tr
                  className="text-[0.6rem] font-bold"
                  style={{ backgroundColor: "var(--main-bg-color)" }}
                >
                  <td className="min-w-[70px] absolute bg-[#efefef]">
                    <span>{tableHead[0]}</span>
                  </td>
                  <td></td>
                  {tableHead.slice(1, 8).map((item) => (
                    <td key={item}>{item}</td>
                  ))}
                </tr>
                {packages.map((pack, _) => (
                  <tr
                    key={_}
                    className="collapse font-bold border-8 text-[10px] h-16"
                    style={{ borderColor: "var(--main-bg-color)" }}
                  >
                    <td className="min-w-[70px]"></td>
                    <td
                      style={{ color: "var(--main-color)" }}
                      className="min-w-[70px] bg-white absolute flex items-center justify-center text-[0.7rem] left-2 h-14"
                    >
                      {pack.id}
                    </td>
                    <td className="min-w-[110px]">{pack.monoceros_id}</td>
                    <td className="min-w-[90px]">
                      <ul className="overflow-y-scroll">
                        {pack.products.map((p) => (
                          <li key={p.id}>{p.product_name}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="min-w-[90px]">{pack.package_size}</td>
                    <td className="min-w-[90px]">
                      {pack.pairing_start_date
                        ? pack.pairing_start_date.slice(0, 10)
                        : ""}
                    </td>
                    <td className="min-w-[90px]">
                      {pack.expiry_date ? pack.expiry_date.slice(0, 10) : ""}
                    </td>
                    <td className="min-w-[90px]">
                      {pack.pairing_end_date ? (
                        pack.pairing_end_date.slice(0, 10)
                      ) : (
                        <button
                          className="text-white font-bold py-1 px-2 rounded mb-1"
                          style={{ backgroundColor: "var(--main-color)" }}
                        >
                          Unpair
                        </button>
                      )}
                    </td>
                    <td
                      onClick={() => handleDeleteProduct(pack.id)}
                      className="min-w-[90px] text-red-800 text-xl cursor-pointer"
                    >
                      ✗
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {packages.length < 1 ? (
            <div className="flex items-center justify-center bg-white w-[90vw] h-16">
              <p>No packages</p>
            </div>
          ) : null}
          {Math.ceil(numberOfPackages / packagesPerPage) > 1 ? (
            <div
              className="flex justify-center w-full"
              style={{ backgroundColor: "var(--main-bg-color)" }}
            >
              <Pagination
                index={Math.ceil(numberOfPackages / packagesPerPage)}
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
