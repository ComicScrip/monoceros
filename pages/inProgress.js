import Image from "next/image";
import logo from "../public/images/logo-monoceros-round.png";

export default function InProgress() {
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
