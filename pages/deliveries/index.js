import React from "react";
import { getDeliveries } from "../../lib/monocerosAPI";
//import Link from "next/link";
import { useRouter } from "next/router";

export default function Deliveries({ allDeliveries }) {
  const router = useRouter();
  console.log(allDeliveries);
  return (
    <div>
      {allDeliveries.map((delivery) => (
        <div key={delivery.id} style={{ display: "flex" }}>
          <p>{delivery.id}</p>
          <p>{delivery.delivery_path.shipment_paths[0].destination.city}</p>
          <button
            type="button"
            onClick={() => {
              router.push({
                pathname: "/deliveries/[did]",
                query: { did: delivery.id },
              });
            }}
          >
            Details
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const allDeliveries = await getDeliveries();
  return {
    props: {
      allDeliveries,
    },
  };
}
