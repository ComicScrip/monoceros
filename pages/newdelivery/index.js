import Image from "next/image";
import Layout from "../../components/layout";
import Meta from "../../components/meta";

const NewDelivery = () => {
  return (
    <>
      <Meta pagetitle="Monoceros - New Delivery" />
      <Layout>
        <h1>New Delivery</h1>
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
    </>
  );
};

export default NewDelivery;
