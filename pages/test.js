import { useState } from "react";
import WebcamVideo from "../components/testWebcam";

export default function Test() {
  const [toggleTab, setToggleTab] = useState(true);
  return (
    <div className="w-5/6 mx-auto">
      {toggleTab ? (
        <div className="h-44 w-full">
          <WebcamVideo />
        </div>
      ) : (
        <div>
          <div className="font-bold mb-10 text-lg">Not webcam</div>
          <div className="h-96">None</div>
        </div>
      )}
      <button onClick={() => setToggleTab(!toggleTab)}>Toggle webcam</button>
    </div>
  );
}
