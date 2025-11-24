import Image from "next/image";
import Link from "next/link";

// import "./logo.scss";
import logo from "./logo.png";

export function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="logo" width={200} height={60} />
    </Link>
  );
}
