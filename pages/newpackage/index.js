import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Scanner from "../../components/scanner";
import SelectManually from "../../components/selectManually";
import ProductStep from "../../components/productStep";
import RecapNewPackage from "../../components/recapNewPackage";

export default function NewPackage() {
  const [sensor, setSensor] = useState("");
  const [product, setProduct] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [packageInfos, setPackageInfos] = useState([]);
  const [route, setRoute] = useState("scanSensor");
  const router = {
    scanSensor: (
      <Scanner
        setRoute={setRoute}
        setValue={setSensor}
        title={"Scan sensor"}
        route={"selectSensor"}
        type={"sensor"}
        value={sensor}
      />
    ),
    selectSensor: (
      <SelectManually
        setRoute={setRoute}
        setValue={setSensor}
        title={"select sensor manually"}
        route={"productStep"}
        btnText={"Add sensor"}
        type={"sensor"}
        value={sensor}
      />
    ),
    productStep: <ProductStep setRoute={setRoute} sensorId={sensor} />,
    scanProduct: (
      <Scanner
        setRoute={setRoute}
        setValue={setProduct}
        title={"Scan product"}
        route={"selectProduct"}
        type={"product"}
        value={product}
      />
    ),
    selectProduct: (
      <SelectManually
        setRoute={setRoute}
        setValue={setProduct}
        value={product}
        title={"Select product manually"}
        route={"recapCreation"}
        btnText={"Add product"}
        type={"product"}
      />
    ),
    recapCreation: (
      <RecapNewPackage
        quantity={productQuantity}
        setQuantity={setProductQuantity}
        productId={product}
        sensorId={sensor}
        setPackage={setPackageInfos}
        packageInfos={packageInfos}
        setRoute={setRoute}
      />
    ),
  };

  return <Layout>{router[route]}</Layout>;
}
