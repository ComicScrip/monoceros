import React from "react";
import Layout from "../../components/layout";
import QrCodeReader from "../../components/qrCodeReader";

export default function NewPackage() {
  return (
    <Layout>
      <div className="flex flex-col items-center bg-[#999999] h-[100vh] text-white">
        <p className="font-[900] text-2xl">Scan sensor</p>
        <QrCodeReader />
        <p>Place the QR code inside the window to scan it</p>
        <button className="w-[215px] py-3 px-4 bg-main_color rounded-md">
          Enter details manually
        </button>
      </div>
    </Layout>
  );
}
