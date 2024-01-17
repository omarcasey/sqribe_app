import Navbar from "@/components/Marketing/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-start">
        <Link className="flex flex-col items-center mb-24 mt-20 group" href={"/"}>
          <Image
            src={"/abstract.png"}
            width={1024}
            height={1024}
            className="w-24 contrast-125"
            alt=""
          />
          <p className="text-gray-400 font-bold text-xl tracking-widest group-hover:text-white transition-all">
            Back to Sqribe
          </p>
        </Link>
        <p className="text-6xl mb-4">404</p>
        <p className="uppercase text-4xl">Page not found</p>
      </div>
    </div>
  );
};

export default Custom404;
