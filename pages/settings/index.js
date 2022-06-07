import Image from "next/image";
import Meta from "../../components/meta";

const Settings = () => {
  return (
    <>
      <Meta pagetitle="Monoceros - Settings" />
      <h1>Settings</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Image
          priority
          src="/images/enconstruction.png"
          height={200}
          width={200}
          alt="en construction"
          style={{ zIndex: -1 }}
        />
        <p>Page under construction ...</p>
      </div>
    </>
  );
};

export default Settings;
