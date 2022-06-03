import { useEffect } from "react";
import {
  oneDelivery,
  deliveriesOverview,
  userContent,
  allProducts,
} from "../lib";
import DeliveriesStatus from "../components/deliveriesStatus";
import DeliveryPath from "../components/deliveryPath";
import ProductsList from "../components/productsList";

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

  return (
    <div className="flex flex-col items-center bg-[#efefef] h-[100vh]">
      <DeliveriesStatus />
      <DeliveryPath id={179} />
      <ProductsList />
    </div>
  );
}
