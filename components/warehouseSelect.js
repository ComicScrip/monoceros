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
  if (!warehouses) {
    warehouses = [{ name: "no option", id: 0 }];
  }

  return (
    <>
      <div className="flex h-10">
        <select
          type="search"
          onChange={(e) => selectWharehouse(e.target.value)}
          value={warehouse}
          className="bg-white w-[90vw] h-10 mb-5 "
        >
          <option value="" className="text-gray-300" disabled hidden>
            Warehouses
          </option>
          {warehouses.map((warehouses) => (
            <option key={warehouses.id} value={warehouses.id}>
              {warehouses.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleClick()}
          className="ml-3 text-white text-xl border-white border-2 w-10"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          ✗
        </button>
      </div>
    </>
  );
}
