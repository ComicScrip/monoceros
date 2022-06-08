import Image from "next/image";
import Meta from "../../components/meta";
import Layout from "../../components/layout";

const Help = () => {
  return (
    <Layout>
      <Meta pagetitle="Monoceros - Help" />
      <h1>Help</h1>
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
    </Layout>
  );
};

export default Help;
