import { useTranslation } from "next-i18next";

export default function WarehouseSelect({
  warehouses,
  selectWharehouse,
  warehouse,
  setCurrentPage,
}) {
  const { t } = useTranslation("productsCatalogue");
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
      <div className="flex h-7 w-[70vw]">
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
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
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
