export default function CountrySelect({ selectName, countries }) {
  return (
    <>
      <select className="bg-white w-[90vw] h-10 mb-5">
        <option value="" disabled selected hidden>
          {selectName}
        </option>
        {countries.map((country) => (
          <option key={country.country} value={country.country}>
            {country.country}
          </option>
        ))}
      </select>
    </>
  );
}
