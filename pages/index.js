import Meta from "../components/meta";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Meta pagetitle="Monoceros - HomePage" />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
