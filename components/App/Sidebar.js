import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaFolder, FaHistory } from "react-icons/fa";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { SiAudiomack } from "react-icons/si";
import DropdownMenuIdk from "./DropdownMenuIdk";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="w-[17.5rem] dark:bg-neutral-900 bg-white py-4 px-4 border-r border-foreground-200 flex flex-col">
      <Link href="/" className="flex items-center mb-10 p-1">
        <Image
          className="w-auto h-10 mr-2"
          src="/new logo transparent.png"
          alt=""
          width={1024}
          height={1024}
        />
        <h1 className="text-foreground font-extrabold text-2xl tracking-tight">
          Sqribe
        </h1>
      </Link>
      <div className="flex-1">
        <div className="flex flex-col gap-2 max-w-2xl justify-evenly">
          <Link
            href="/app/dashboard"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 ${
              router.pathname === "/app/dashboard" ? "bg-foreground-100" : ""
            }`}
          >
            <RiLayoutMasonryFill
              className={`w-5 mr-2 ${
                router.pathname === "/app/dashboard" ? "text-cyan-300" : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/dashboard"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-300"
                  : ""
              }`}
            >
              Dashboard
            </p>
          </Link>
          <Link
            href="/app/projects"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 ${
              router.pathname === "/app/projects" ? "bg-foreground-100" : ""
            }`}
          >
            <FaFolder className="w-5 mr-2" />
            <p className="">Projects</p>
          </Link>
          <Link
            href="/app/makespeech"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 ${
              router.pathname === "/app/makespeech" ? "bg-foreground-100" : ""
            }`}
          >
            <SiAudiomack
              size={20}
              className={`w-5 mr-2 ${
                router.pathname === "/app/makespeech" ? "text-cyan-300" : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/makespeech"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-300"
                  : ""
              }`}
            >
              Speech
            </p>
          </Link>
          <Link
            href="/app/history"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 ${
              router.pathname === "/app/history" ? "bg-foreground-100" : ""
            }`}
          >
            <FaHistory className="w-5 mr-2" />
            <p className="">History</p>
          </Link>
        </div>
      </div>

      <Divider className="bg-foreground-300 mb-3" />
      <DropdownMenuIdk router={router} />
      {/* <p className="text-foreground text-sm mt-3 ml-2 mb-4">Omar Casey</p> */}
    </div>
  );
};

export default Sidebar;
