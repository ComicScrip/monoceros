import Meta from "../components/meta";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  const email = process.env.NEXT_PUBLIC_EMAIL;
  return (
    <>
      <Meta pagetitle="Monoceros - HomePage" />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
