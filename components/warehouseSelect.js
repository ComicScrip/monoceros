export default function WarehouseSelect({
  warehouses,
  selectWharehouse,
  warehouse,
  setCurrentPage,
}) {
  function handleClick() {
    selectWharehouse("");
    setCurrentPage(1);
  }

  function handleSelectChange(e) {
    selectWharehouse(e.target.value);
    setCurrentPage(1);
  }
  if (!warehouses) {
    warehouses = [{ name: "no option", id: 0 }];
  }

  return (
    <>
      <div className="flex h-7 w-[90vw]">
        <select
          type="search"
          onChange={(e) => handleSelectChange(e)}
          value={warehouse}
          className="bg-white w-[90vw] h-7 mb-5"
          style={{ fontSize: "10px" }}
        >
          <option value="" className="text-gray-300" disabled hidden>
            Warehouse
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
