import {
  getDeliveriesOverview,
  getOneDelivery,
  getAllProducts,
  getCurrentUserInfos,
} from "../lib";
import { useContext } from "react";
import tokenContext from "../lib/tokenContext";
import { tokensTest } from "../lib/tokenContext";
import DeliveriesStatus from "../components/deliveriesStatus";

export default function Test(props) {
  const { in_progress, delayed, completed, total } = props.overview;
  console.log(props.oneDelivery);
  console.log(props.userInfos);
  console.log(props.allProducts);

  return (
    <div className="flex justify-center">
      <DeliveriesStatus
        inProgress={in_progress}
        delayed={delayed}
        completed={completed}
        total={total}
      />
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
