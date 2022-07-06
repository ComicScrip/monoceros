import React, { useState, useEffect } from "react";
import { getOneProduct } from "../lib/productsAPI";

export default function RecapNewPackage({
  quantiy,
  setQuantity,
  productId,
  sensorId,
  setPackage,
  packageInfo,
  setRoute,
}) {
  const [productInfos, setProductInfos] = useState({});

  async function getData() {
    const res = await getOneProduct(productId);
    setProductInfos(res);
  }

  function createPackage() {
    setQuantity(1);
    setPackage((prevState) => {
      return [
        ...prevState,
        { product: productInfos.name, productId: productId, quantity: quantiy },
      ];
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="font-[900] text-xl text-main_color w-[90%] text-center">
          Sensor and product succesfully appaired
        </p>
        <div className="bg-white flex flex-col w-[250px] items-center rounded-md p-3">
          <p>
            Sensor ID <span className="font-[900]">{sensorId}</span>
          </p>
          <p className="text-center">Product Count</p>
          <input
            type="number"
            className="w-[90%] border-[1px] border-main_bg_color"
            value={quantiy}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="flex flex-col items-start self-start ml-3">
            <p>
              product :<span className="ml-2">{productInfos.name}</span>
            </p>
            <p>
              Expiring on :
              <span className="ml-2">
                {productInfos.expiration_date
                  ? productInfos.expiration_date.slice(0, 10)
                  : "null"}
              </span>
            </p>
            <p>Conditions limits :</p>
            <ul>
              <li>
                Temperature :
                <span className="ml-2">
                  {productInfos.temperature_min} /{productInfos.temperature_max}
                </span>
                °C
              </li>
              <li>
                Humidity :
                <span className="ml-2">
                  {productInfos.humidity_min} / {productInfos.humidity_max}
                </span>
                %
              </li>
              <li>
                Vibrations :
                <span className="ml-2">{productInfos.shock_max}</span>G
              </li>
              <li>
                Light :<span className="ml-2">{productInfos.light_max}</span>𝝺
                nm
              </li>
              <li>Orientation :</li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => {
            setRoute("scanProduct");
            createPackage();
          }}
          className=" bg-white border-[1px] w-[250px] py-3 rounded-md border-black mt-8"
        >
          Scan one more product
        </button>
        <button
          onClick={() => {
            setRoute("selectProduct");
            createPackage();
          }}
          className=" bg-white border-[1px] w-[250px] py-3 rounded-md border-black mt-4"
        >
          Add manually one more product
        </button>
        <button
          onClick={() => setRoute("")}
          className="w-[250px] py-3 text-white bg-main_color rounded-md mt-4"
        >
          Create package
        </button>
      </div>
    </>
  );
}
