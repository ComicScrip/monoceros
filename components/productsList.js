/* eslint-disable */

import { useEffect, useState } from "react";
import { allProducts } from "../lib";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function request() {
      const getData = await allProducts();
      setProducts(getData.data.results);
    }
    request();
  }, []);
  console.log(products);
  const tableHead = [
    "Product",
    "Expiration",
    "Temperature (°C)",
    "Humidity (%RH)",
    "Light (𝝺 nm)",
    "Shock (G)",
    "Unit Cost (€)",
    "delay (day(s))",
  ];
  return (
    <div className="w-[90%] bg-white">
      <table className="w-[100%]">
        <thead className="bg-[#efefef]">
          {tableHead.map((item) => (
            <td key={item}>{item}</td>
          ))}
        </thead>
        <tbody>
          {products.map((product, _) => (
            <tr
              key={_}
              className="border-y-[15px] collapse h-24   border-[#efefef]"
            >
              <td>{product.name}</td>
              <td>{product.expiration_date}</td>
              <td>
                {product.temperature_min} / {product.temperature_max}
              </td>
              <td>
                {product.humidity_min} / {product.humidity_max}
              </td>
              <td>
                {product.light_min} / {product.light_max}
              </td>
              <td>
                {product.shock_min} / {product.shock_max}
              </td>
              <td>{product.unit_cost}</td>
              {/* <td>{lead_time_average || null}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
