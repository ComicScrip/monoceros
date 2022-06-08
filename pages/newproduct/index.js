import Image from "next/image";
import Meta from "../../components/meta";

const NewProduct = () => {
  return (
    <>
      <Meta pagetitle="Monoceros - New Product" />
      <h1>New Product</h1>
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

export default NewProduct;
