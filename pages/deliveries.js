import Image from "next/image";
import Meta from "../components/meta";

const Deliveries = () => {
  return (
    <>
      <Meta pagetitle="Monoceros - Deliveries" />
      <h1>Products</h1>
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

export default Deliveries;
