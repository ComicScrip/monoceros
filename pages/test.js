import { useEffect } from "react";
import {
  oneDelivery,
  deliveriesOverview,
  userContent,
  allProducts,
} from "../lib";

export default function Test() {
  useEffect(() => {
    async function getData() {
      const data1 = await oneDelivery(194);
      const data2 = await deliveriesOverview();
      const data3 = await userContent();
      const data4 = await allProducts();
      console.log(data1, data2, data3, data4);
    }
    getData();
  }, []);

  return <h1 className="text-xl text-center">test</h1>;
}
