import React from "react";

export default function ProductStep({ setRoute, sensorId }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="font-[900] text-xl text-main_color">
          Sensor scan successful
        </p>
        <p className="bg-white w-[200px] py-2 text-center font-[900]">
          {sensorId}
        </p>
        <p className="w-[80vw] text-center text-xs">
          Sensor has been read and data safely stored on the cloud
        </p>
        <button
          onClick={() => setRoute("scanProduct")}
          className="w-[215px] py-3 text-white bg-main_color rounded-md"
        >
          Scan product barcode
        </button>
        <button
          onClick={() => {
            setRoute("selectProduct");
          }}
          className=" bg-white border-[1px] w-[215px] py-3 rounded-md border-black mt-8"
        >
          Enter product manually
        </button>
      </div>
    </>
  );
}
