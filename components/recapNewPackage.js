import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getOneProduct } from "../lib/productsAPI";
import { createPackage } from "../lib/packagesAPI";

export default function RecapNewPackage({
  quantity,
  setQuantity,
  productId,
  sensorId,
  setPackage,
  packageInfos,
  setRoute,
}) {
  const [productInfos, setProductInfos] = useState({});
  const [selectProduct, setSelectProduct] = useState(false);
  const router = useRouter();
  async function getData() {
    const res = await getOneProduct(productId);
    setProductInfos(res);
  }

  function addProduct() {
    setPackage((prevState) => {
      return [
        ...prevState,
        {
          product: parseInt(productId),
          product_amount: parseInt(quantity),
        },
      ];
    });
    setQuantity(1);
  }

  async function postPackage() {
    const packageToPost = {
      products: packageInfos,
      sensor_id: sensorId,
    };
    try {
      await createPackage(packageToPost);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, [packageInfos]);

  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <p className="font-[900] text-xl text-main_color w-[90%] text-center mb-5">
          Sensor and product succesfully appaired
        </p>
        <div className="bg-white flex flex-col w-[250px] items-center rounded-md p-3 mb-5 text-sm">
          <p className="mb-1">
            Sensor ID <span className="font-[900]">{sensorId}</span>
          </p>
          <p className="text-center">Product Count</p>
          <input
            type="number"
            className="w-[90%] border-[1px] border-main_bg_color mb-2"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <div className="flex flex-col items-start self-start ml-3">
            <p>
              <span className="font-[900]">product :</span>
              <span className="ml-2">{productInfos.name}</span>
            </p>
            <p>
              <span className="font-[900]">Expiring on :</span>
              <span className="ml-2">
                {productInfos.expiration_date
                  ? productInfos.expiration_date.slice(0, 10)
                  : "null"}
              </span>
            </p>
            <p>
              <span className="font-[900]">Conditions limits :</span>
            </p>
            <ul className="pl-1">
              <li>
                <span className="text-main_color">∙ </span>Temperature :
                <span className="ml-2">
                  {productInfos.temperature_min} /{productInfos.temperature_max}
                </span>
                °C
              </li>
              <li>
                <span className="text-main_color">∙ </span>Humidity :
                <span className="ml-2">
                  {productInfos.humidity_min} / {productInfos.humidity_max}
                </span>
                %
              </li>
              <li>
                <span className="text-main_color">∙ </span>Vibrations :
                <span className="ml-2">{productInfos.shock_max}</span>G
              </li>
              <li>
                <span className="text-main_color">∙ </span>
                Light :<span className="ml-2">{productInfos.light_max}</span>𝝺
                nm
              </li>
              <li>
                <span className="text-main_color">∙ </span>Orientation :
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => {
            addProduct();
            setSelectProduct(true);
          }}
          className="w-[250px] py-3 text-white bg-main_color rounded-md mt-4"
          disabled={selectProduct ? true : false}
          style={{ opacity: selectProduct ? "0.2" : null }}
        >
          Select this product
        </button>
        <button
          onClick={() => {
            setRoute("scanProduct");
          }}
          className=" bg-white border-[1px] w-[250px] py-3 rounded-md  border-black mt-4"
        >
          {selectProduct ? "Add one more product" : "Change product"}
        </button>
        <button
          disabled={!selectProduct ? true : false}
          style={{ opacity: !selectProduct ? "0.2" : null }}
          onClick={() => {
            postPackage();
            router.push("/packages");
          }}
          className="w-[250px] py-3 text-white bg-main_color rounded-md mt-4"
        >
          Create package
        </button>
      </div>
    </>
  );
}
