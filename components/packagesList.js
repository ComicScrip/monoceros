import { useEffect, useState } from "react";
import Pagination from "./pagination";
import { getAllPackages } from "../lib";

export default function PackagesList() {
  const [packages, setPackages] = [];
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [numberOfPackages, setNumberOfPackages] = useState(null);

  async function getPackagesNumber() {
    const pnbr = await getAllPackages(1, 0);
    setNumberOfPackages(pnbr.data.count);
  }

  useEffect(() => {
    async function request() {
      const packages = await getAllPackages();
      console.log(packages);
    }
    request();
    console.log(numberOfPackages);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-2xl w-full font-bold mb-5 text-[#e16565]">
          Packages catalogue
        </h1>
      </div>
      <Pagination
        index={Math.ceil(numberOfPackages / productsPerPage - 1)}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
