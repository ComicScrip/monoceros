export default function CustomSelect({
  items,
  handleSelectItem,
  selectItem,
  setCurrentPage,
  defaultValue,
  keyOne,
  keyTwo,
}) {
  function handleClick() {
    handleSelectItem("");
    setCurrentPage(1);
  }

  function handleSelectChange(e) {
    handleSelectItem(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex h-7 w-[70vw] mb-2">
        <select
          type="search"
          onChange={(e) => handleSelectChange(e)}
          value={selectItem}
          className="bg-white w-[90vw] h-7 mb-5 rounded pl-2 border-r-8 border-white"
          style={{ fontSize: "13px" }}
        >
          <option value="" className="text-gray-300" disabled hidden>
            {defaultValue}
          </option>
          {items.map((item) => (
            <option key={item[keyOne]} value={item[keyOne]}>
              {item[keyTwo]}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleClick()}
          className="ml-3 text-white text-l border-white border-2 w-7 rounded"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          ✗
        </button>
      </div>
    </>
  );
}
