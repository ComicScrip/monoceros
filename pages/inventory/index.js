import Image from "next/image";
import Meta from "../../components/meta";

export default function Inventory() {
  return (
    <>
      <Meta pagetitle="Monoceros - Inventory" />
      <h1>Inventory</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
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
}
