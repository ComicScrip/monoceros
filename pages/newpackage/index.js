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
        title={"select manually sensor"}
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
        setvalue={setProduct}
        title={"Scan product"}
        route={"selectProduct"}
        type={"product"}
      />
    ),
    selectProduct: (
      <SelectManually
        setRoute={setRoute}
        setValue={setProduct}
        value={product}
        title={"Select manually product"}
        route={"recapCreation"}
        btnText={"Add product"}
        type={"product"}
      />
    ),
    recapCreation: (
      <RecapNewPackage
        quantiy={productQuantity}
        setQuantity={setProductQuantity}
        productId={product}
        sensorId={sensor}
        setPackage={setPackageInfos}
        packageInfos={packageInfos}
        setRoute={setRoute}
      />
    ),
  };

  useEffect(() => {
    console.log(sensor);
    console.log("package => ", packageInfos);
  }, [packageInfos, sensor, product]);

  return <Layout>{router[route]}</Layout>;
}
