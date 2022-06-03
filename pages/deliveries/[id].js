import Image from "next/image";

const DeliveryDetail = () => {
  return (
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
      />
      <p>Page under construction ...</p>
    </div>
  );
};

export default DeliveryDetail;
