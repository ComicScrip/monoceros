import React from "react";
import QrCodeReader from "./qrCodeReader";

export default function Scanner({
  setRoute,
  setValue,
  title,
  route,
  type,
  value,
}) {
  return (
    <>
      <div className="flex flex-col items-center bg-[#999999] h-[100vh] text-white pt-5">
        <p className="font-[900] text-2xl mb-3">{title}</p>
        <QrCodeReader setValue={setValue} />
        <p className="w-[200px] text-center mb-3">
          Place the QR code inside the window to scan it
        </p>
        <button
          onClick={() => setRoute(route)}
          className="w-[215px] py-3 px-4 bg-main_color rounded-md"
        >
          Enter details manually
        </button>
        value {JSON.stringify(value)}
      </div>
    </>
  );
}
