import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
let html5QrCode;

const QrCodeReader = (props) => {
  useEffect(() => {
    props.setValue("hello");
    html5QrCode = new Html5Qrcode("reader");
  }, []);

  const handleClickAdvanced = () => {
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      props.setValue(decodedText);
      handleStop();
    };
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 300, height: 300 } },
      qrCodeSuccessCallback
    );
  };

  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[400px] h-[400px]">
      <div id="reader" />
      <button onClick={() => handleClickAdvanced()}>click pro</button>
      <button onClick={() => handleStop()}>stop pro</button>
    </div>
  );
};
export default QrCodeReader;
