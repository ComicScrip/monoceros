import React from "react";
import QrCodeReader from "./qrCodeReader";

export default function Scanner({ setRoute, setValue, title, route }) {
  return (
    <>
      <div className="flex flex-col items-center bg-[#999999] h-[100vh] text-white">
        <p className="font-[900] text-2xl">{title}</p>
        <QrCodeReader />
        <p>Place the QR code inside the window to scan it</p>
        <button
          onClick={() => setRoute(route)}
          className="w-[215px] py-3 px-4 bg-main_color rounded-md"
        >
          Enter details manually
        </button>
      </div>
    </>
  );
}
