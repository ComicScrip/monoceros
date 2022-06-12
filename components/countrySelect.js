export default function CountrySelect({
  countries,
  selectCountry,
  country,
  setCurrentPage,
}) {
  function handleClick() {
    selectCountry("");
    setCurrentPage(1);
  }
  return (
    <>
      <div className="flex h-7 m-2 w-[90vw]">
        <select
          onChange={(e) => selectCountry(e.target.value)}
          value={country}
          className="bg-white w-[90vw] h-7 mb-5"
          style={{ fontSize: "10px" }}
        >
          <option className="font-xs" value="" hidden>
            Country
          </option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
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
