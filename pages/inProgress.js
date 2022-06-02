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
  const t = {
    refresh:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY1NDI1NzgxMCwianRpIjoiZjUzNGU0MTkxYmFjNGJlMWIwNTIzYmU1NzVkYzBkMjciLCJ1c2VyX2lkIjoxMDB9.0n6mRXBPjbINYZ7CwM0fFb6WOJDtonI8Zx7KK_K0CYE",
    access:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0MTg1ODEwLCJqdGkiOiI1YzU4MjI0YThjOWE0OWU3YWY4OTkzMGM3MjdmNDdkNyIsInVzZXJfaWQiOjEwMH0.sF351eCoeTsftbPa4UJkM7KQ50sbciKG7rZ_lpObm9I",
  };
  // const { setToken, tokens } = useContext(tokenContext);
  const { data, error, loaded, tokens } = useApiCall(t, getAllProducts);
  console.log(data);
  console.log(tokens);
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
