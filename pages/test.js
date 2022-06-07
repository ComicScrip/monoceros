import { useEffect } from "react";
import {
  getOneDelivery,
  getDeliveriesOverview,
  getUserContent,
  getAllProducts,
} from "../lib";
import DeliveriesStatus from "../components/deliveriesStatus";
import DeliveryPath from "../components/deliveryPath";
import ProductsList from "../components/productsList";

export default function Test() {
  useEffect(() => {
    async function getData() {
      const data1 = await getOneDelivery(194);
      const data2 = await getDeliveriesOverview();
      const data3 = await getUserContent();
      const data4 = await getAllProducts();
      console.log(data1, data2, data3, data4);
    }
    //getData();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#efefef]">
      <DeliveriesStatus />
      <DeliveryPath id={179} />
      <ProductsList />
    </div>
  );
}
