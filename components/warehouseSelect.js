export default function WharehouseSelect({ selectName, wharehouses }) {
  console.log(wharehouses);
  return (
    <>
      <select className="bg-white w-[90vw] h-10 mb-5">
        <option value="" disabled selected hidden>
          {selectName}
        </option>
        {wharehouses.map((wharehouses) => (
          <option
            key={wharehouses.storage.name}
            value={wharehouses.storage.name}
          >
            {wharehouses.storage.name}
          </option>
        ))}
      </select>
    </>
  );
}
