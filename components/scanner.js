import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { getAllProducts } from "../lib/productsAPI";
import { getAllSensorNotAssigned } from "../lib/sensorDataAPI";
import toast, { Toaster } from "react-hot-toast";

let html5QrCode;

export default function Scanner({ setRoute, setValue, title, route, type }) {
  const [listItems, setListItems] = useState([]);
  const [scanner, setScanner] = useState(false);
  const routes = { sensor: "productStep", product: "recapCreation" };
  const checkType = { sensor: "sensor_id", product: "id" };

  async function getListItems() {
    if (type === "product") {
      const res = await getAllProducts(100, 0);
      setListItems(res.data.results);
    } else if (type === "sensor") {
      const res = await getAllSensorNotAssigned();
      setListItems(res);
    }
  }

  function isValidQrCode(QrCode) {
    for (const item of listItems) {
      if (item[checkType[type]] == QrCode) {
        return true;
      }
    }
    return false;
  }

  function handleClickAdvanced() {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      if (isValidQrCode(decodedText)) {
        setValue(decodedText);
        handleStop();
        setScanner(false);
        setRoute(routes[type]);
      } else {
        toast("Invalid QRcode");
        handleStop();
        handleClickAdvanced();
      }
    };
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 300, height: 300 } },
      qrCodeSuccessCallback
    );
  }

  function handleStop() {
    try {
      html5QrCode
        .stop()
        .then(() => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    getListItems();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center bg-[#999999] h-[100vh] text-white pt-5">
        <p className="font-[900] text-xl mb-3">{title}</p>
        <div className="w-[400px] h-[400px]">
          <div id="reader" />
        </div>
        {scanner ? (
          <p className="w-[200px] text-center mb-3">
            Place the QR code inside the window to scan it
          </p>
        ) : null}

        <button
          onClick={() => {
            handleClickAdvanced();
            setScanner(true);
          }}
          className="w-[215px] py-3 px-4 bg-main_color rounded-md"
        >
          Open scanner
        </button>
        <button
          onClick={() => {
            setRoute(route);
            scanner ? handleStop() : null;
          }}
          className="w-[215px] py-3 px-4 bg-white mt-5 text-black rounded-md"
        >
          Enter details manually
        </button>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{}}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--main-bg-color)",
            color: "var(--main-color)",
          },
        }}
      />
    </>
  );
}
