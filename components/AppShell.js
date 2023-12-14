// components/AppShell.js
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { auth } from "@/firebase";
import Image from "next/image";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { SiAudiomack } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import DropdownMenuIdk from "./DropdownMenuIdk";
import { IoIosHelpCircleOutline } from "react-icons/io";

const AppShell = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-neutral-900 px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              className="w-auto h-10 mr-4"
              src="/new logo transparent.png"
              alt=""
              width={1024}
              height={1024}
            />
            <h1 className="text-white font-bold text-lg">Sqribe</h1>
          </Link>
          <div className="flex space-x-10">
            <Link
              href="/dashboard"
              className="flex items-center text-gray-400 hover:text-white transition-all font-medium"
            >
              <RiLayoutMasonryFill
                className={`mr-2 ${
                  router.pathname === "/dashboard" ? "text-cyan-300" : ""
                }`}
              />
              <p
                className={`${
                  router.pathname === "/dashboard"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-300"
                    : ""
                }`}
              >
                Dashboard
              </p>
            </Link>
            <Link
              href="/makespeech"
              className="flex items-center text-gray-400 hover:text-white transition-all font-medium"
            >
              <SiAudiomack
                className={`mr-2 ${
                  router.pathname === "/makespeech" ? "text-cyan-300" : ""
                }`}
              />
              <p
                className={`${
                  router.pathname === "/makespeech"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-300"
                    : ""
                }`}
              >
                Text To Speech
              </p>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center text-gray-400 hover:text-white transition-all font-medium"
            >
              <FaFolder className="mr-2" />
              <p className="">Projects</p>
            </Link>
          </div>
          <div className="flex space-x-3 items-center">
            <DropdownMenuIdk router={router} />
            <Button
              className="px-3"
              startContent={<IoIosHelpCircleOutline size={25} />}
            >
              Help Center
            </Button>
          </div>
          {/* <Button onClick={signOut} className="text-white">
            Sign Out
          </Button> */}
        </div>
      </nav>
      <main className="flex flex-1">{children}</main>
    </div>
  );
};

export default AppShell;
