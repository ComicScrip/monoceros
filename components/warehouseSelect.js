export default function WarehouseSelect({
  selectName,
  warehouses,
  selectWharehouse,
  warehouse,
}) {
  return (
    <>
      <div className="flex h-10">
        <select
          type="search"
          onChange={(e) => selectWharehouse(e.target.value)}
          value={warehouse}
          className="bg-white w-[90vw] h-10 mb-5 "
        >
          <option value="" className="text-gray-300" disabled selected hidden>
            {selectName}
          </option>
          {warehouses.map((warehouses) => (
            <option key={warehouses.id} value={warehouses.id}>
              {warehouses.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => selectWharehouse("")}
          className="ml-3 bg-[#e16565] text-white text-xl border-white border-2 w-10"
        >
          ✗
        </button>
      </div>
    </>
  );
}
