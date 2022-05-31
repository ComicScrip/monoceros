import Image from "next/image";
import {
  getDeliveriesOverview,
  getOneDelivery,
  getAllProducts,
  getCurrentUserInfos,
} from "../lib";
import { useContext } from "react";
import tokenContext from "../lib/tokenContext";
import logo from "../public/images/logo-monoceros.png";

export default function InProgress(
  overview,
  userInfos,
  allProducts,
  oneDelivery
) {
  const { tokens, setTokens } = useContext(tokenContext);

  console.log(oneDelivery);
  console.log(userInfos);
  console.log(allProducts);
  console.log(overview);

  return (
    <div>
      <h1 className="text-center mt-8">
        This page is under construction sorry !!
      </h1>
      <div className="flex justify-center">
        <Image
          src={logo}
          alt="logo-form"
          style={{ margin: "0px auto" }}
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  //const { tokens, setTokens } = useContext(tokenContext);
  const tokensTest = {
    refresh:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1NDExMjU0MywianRpIjoiMTIxMzJmN2JmZTBiNDgwYmJlY2Q4NmZiNmE1NzEyODkiLCJ1c2VyX2lkIjoxMDB9.m9faSP2VEPaSMt07jtYQeDkIaLyvDP0bjLD5U4mTMcY",
    access:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MDQwNTQzLCJqdGkiOiI2YmFjZjgzYTE2MWI0MDViYTI2Mzg5OTcxYzFmNWMzZSIsInVzZXJfaWQiOjEwMH0.gL4ztJx_gKCm8CoSAp_Zx6r3t8blpv9_k65kUNePDls",
  };
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
