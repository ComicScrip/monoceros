export default function CountrySelect({ countries, selectCountry, country }) {
  return (
    <>
      <div className="flex h-10 m-2">
        <select
          onChange={(e) => selectCountry(e.target.value)}
          value={country}
          className="bg-white w-[90vw] h-10 mb-5"
        >
          <option value="" hidden>
            Country
          </option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        <button
          onClick={() => selectCountry("")}
          className="ml-3 bg-[#e16565] text-white text-xl border-white border-2 w-10"
        >
          ✗
        </button>
      </div>
    </>
  );
}
