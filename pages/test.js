/*
import {
  getDeliveriesOverview,
  getOneDelivery,
  getAllProducts,
  getCurrentUserInfos,
} from "../lib";
import { useContext } from "react";
import tokenContext from "../lib/tokenContext";
import DeliveriesStatus from "../components/deliveriesStatus";
import DeliveryPath from "../components/deliveryPath";

export default function Test(props) {
  const { tokens, setTokens } = useContext(tokenContext);
  console.log(tokens);
  const { in_progress, delayed, completed, total } = props.overview;
  
  console.log(props.oneDelivery);
  console.log(props.userInfos);
  console.log(props.allProducts);
    

  const deliveryId = props.oneDelivery.id;
  const deliveryPath = props.oneDelivery.delivery_path.shipment_paths;
  return (
    <div className="flex justify-center flex-col items-center">
      <DeliveriesStatus
        inProgress={in_progress}
        delayed={delayed}
        completed={completed}
        total={total}
      />
      <DeliveryPath deliveryPath={deliveryPath} deliveryId={deliveryId} />
    </div>
  );
}

export async function getStaticProps() {
  const overview = await getDeliveriesOverview(tokensTest.access);
  const userInfos = await getCurrentUserInfos(tokensTest.access);
  const allProducts = await getAllProducts(tokensTest.access);
  const oneDelivery = await getOneDelivery(tokensTest.access, 194);

  return {
    props: {
      overview,
      userInfos,
      allProducts,
      oneDelivery,
    },
  };
}
*/
