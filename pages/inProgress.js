import Image from "next/image";
import logo from "../public/images/logo-monoceros.png";
import tokenContext from "../lib/tokenContext";
import { useContext } from "react";
import {
  getAllProducts,
  getCurrentUserInfos,
  getOneDelivery,
  getDeliveriesOverview,
} from "../lib";
import useApiCall from "../hooks/useApiCall";

export default function InProgress() {
  const { setToken, tokens } = useContext(tokenContext);
  console.log(tokens);
  const { data, error, loaded, token } = useApiCall(tokens, getAllProducts);
  console.log(data);
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
