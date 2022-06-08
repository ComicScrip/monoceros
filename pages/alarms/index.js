import Image from "next/image";
import Meta from "../../components/meta";

const Alarms = () => {
  return (
    <>
      <Meta pagetitle="Monoceros - Alarms" />
      <h1>Alarms</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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

export default Alarms;
