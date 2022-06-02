import Image from "next/image";
import logo from "../public/images/logo-monoceros.png";
import useApiCall from "../hooks/useApiCall";
import {
  getAllProducts,
  getCurrentUserInfos,
  getDeliveriesOverview,
  getOneDelivery,
} from "../lib";
import { useContext } from "react";

export default function InProgress() {
  //const { token, setTokens } = useContext(tokenContext);
  const { data, error, loaded, tokens } = useApiCall(
    tokensTest,
    getDeliveriesOverview
  );
  console.log(data, tokens);
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
