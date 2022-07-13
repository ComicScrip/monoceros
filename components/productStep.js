import React from "react";

export default function ProductStep({ setRoute, sensorId }) {
  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <p className="font-[900] text-xl text-main_color mb-3">
          Sensor selected
        </p>
        <p className="bg-white w-[200px] py-2 text-center font-[900]">
          {sensorId}
        </p>
        <p className="w-[150px] text-center text-xs mt-1">
          Sensor has been read and data safely stored on the cloud
        </p>
        <button
          onClick={() => setRoute("scanProduct")}
          className="w-[215px] py-3 text-white bg-main_color mt-5 rounded-md"
        >
          Next Step
        </button>
        <button
          onClick={() => setRoute("scanSensor")}
          className="w-[215px] py-3 text-black bg-white mt-5 rounded-md border-black border-[1px]"
        >
          Step back
        </button>
      </div>
    </>
  );
}
