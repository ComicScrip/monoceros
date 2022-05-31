import Image from "next/image";
import logo from "../public/images/logo-monoceros.png";

export default function InProgress() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "300px" }}>
        This page is under construction sorry !!
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
