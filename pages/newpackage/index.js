import React from "react";
import Layout from "../../components/layout";
import QrCodeReader from "../../components/qrCodeReader";

export default function NewPackage() {
  return (
    <Layout>
      <div className="flex flex-col items-center bg-[#9b9292] h-[100vh]">
        <QrCodeReader />
      </div>
    </Layout>
  );
}
