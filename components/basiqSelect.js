export default function BasiqSelect({
  setState,
  items,
  value,
  defaultValue,
  keyOne,
  keyTwo,
}) {
  return (
    <select
      onChange={(e) => setState(e.target.value)}
      value={value}
      className="bg-white p-[4px] w-[60vw] mt-2 rounded"
      required
    >
      <option value="" className="text-gray-300" disabled hidden>
        {defaultValue}
      </option>
      {items.map((item, _) => (
        <option key={_} value={item[keyOne]}>
          {item[keyTwo]}
        </option>
      ))}
    </select>
  );
}
