import Router, { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function WarehouseSelect({
  warehouses,
  selectWharehouse,
  warehouse,
  setCurrentPage,
}) {
  const { t } = useTranslation("products");
  const router = useRouter();
  function handleClick() {
    selectWharehouse("");
    setCurrentPage(1);
  }

  function handleSelectChange(e) {
    selectWharehouse(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex h-7 w-[90vw]">
        <select
          type="search"
          onChange={(e) => handleSelectChange(e)}
          value={warehouse}
          className="bg-white w-[90vw] h-7 mb-5"
          style={{ fontSize: "13px" }}
        >
          <option value="" className="text-gray-300" disabled hidden>
            {t("warehouse")}
          </option>
          {warehouses.map((warehouses) => (
            <option key={warehouses.id} value={warehouses.id}>
              {warehouses.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleClick()}
          className="ml-3 text-white text-l border-white border-2 w-7"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          ✗
        </button>
      </div>
    </>
  );
}
