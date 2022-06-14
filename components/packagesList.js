import { useEffect, useState } from "react";
import Pagination from "./pagination";
import CountrySelect from "./countrySelect";
import WarehouseSelect from "./warehouseSelect";
import { getAllPackages } from "../lib/packagesAPI";

export default function PackagesList() {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 9;
  const [numberOfPackages, setNumberOfPackages] = useState(null);

  useEffect(() => {
    async function request() {
      const data = await getAllPackages(
        packagesPerPage,
        (currentPage - 1) * (packagesPerPage + 1)
      );
      setNumberOfPackages(data.count);
      setPackages(data.results);
    }
    request();
  }, [currentPage]);

  const tableHead = [
    "ID",
    "Sensor",
    "Product",
    "Size",
    "Pairing start date",
    "Expiry date",
    "Pairing end date",
    " ",
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
          PACKAGES CATALOGUE
        </h1>
        <div className="flex flex-col items-center justify-center w-[95] mb-10">
          <CountrySelect
            countries={[]}
            selectCountry={" "}
            country={" "}
            setCurrentPage={setCurrentPage}
          />
          <WarehouseSelect
            warehouses={[]}
            selectWharehouse={" "}
            warehouse={" "}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="w-[95vw] bg-white flex flex-col items-center justify-center">
          {packages.map((pack, _) => (
            <div
              className="h-16 overflow-x-scroll w-[100%]"
              style={{ backgroundColor: "var(--main-bg-color)" }}
              key={_}
            >
              <table className="w-[95vw] h-14">
                <tbody className="bg-white">
                  <tr className="text-[0.6rem]">
                    {tableHead.map((item) => (
                      <td key={item}>{item}</td>
                    ))}
                  </tr>
                  <tr key={_} className="collapse font-bold text-[10px]">
                    <td className="min-w-[70px]">{pack.id}</td>
                    <td className="min-w-[110px]">{pack.monoceros_id}</td>
                    <td className="min-w-[90px]">
                      <ul className="overflow-y-scroll max-h-8">
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
                    <td className="min-w-[90px]">delete</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          {packages.length < 1 ? (
            <div className="flex items-center justify-center bg-white w-[90vw] h-16">
              <p>No packages</p>
            </div>
          ) : (
            <div
              className="flex justify-center w-full absolute bottom-5 mt-3"
              style={{ backgroundColor: "var(--main-bg-color)" }}
            >
              <Pagination
                index={Math.ceil(numberOfPackages / packagesPerPage)}
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
