import Meta from "../components/meta";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Meta pagetitle="Monoceros - HomePage" />
      <button
        onClick={() =>
          signIn(("credentials", { redirect: false, password: "password" }))
        }
      >
        Sign in
      </button>
    </>
  );
}
