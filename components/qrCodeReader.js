import React from "react";

export default function QrCodeReader({ setValue, setRoute, type, route }) {
  const [data, setData] = React.useState("No result");
  const routes = { sensor: "productStep", product: "recapCreation" };

  return (
    <>
      <div className="z-1000 w-[300px] h-[300px] mb-20"></div>
    </>
  );
}
