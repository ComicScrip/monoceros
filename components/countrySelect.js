import Router, { useRouter } from "next/router";

export default function CountrySelect({
  countries,
  selectCountry,
  country,
  setCurrentPage,
}) {
  const router = useRouter();
  function handleClick() {
    selectCountry("");
    setCurrentPage(1);
  }

  function handleSelectChange(e) {
    selectCountry(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex h-7 m-2 w-[90vw]">
        <select
          onChange={(e) => handleSelectChange(e)}
          value={country}
          className="bg-white w-[90vw] h-7 mb-5"
          style={{ fontSize: "13px" }}
        >
          <option className="font-xs" value="" hidden>
            {router.query.country || "country"}
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
