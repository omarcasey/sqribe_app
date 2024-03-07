import { Divider, User } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaFolder, FaHistory } from "react-icons/fa";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { SiAudiomack } from "react-icons/si";
import { FaRegCreditCard } from "react-icons/fa6";
import { TfiVideoClapper } from "react-icons/tfi";
import { MdOndemandVideo } from "react-icons/md";
import { useSelector } from "react-redux";
import DropdownMenuIdk from "./DropdownMenuIdk";

const Sidebar = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user.auth);
  const userData = useSelector((state) => state.user.data);
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const subscription = userData?.subscriptions[0];

  return (
    <div className="w-[17.5rem] dark:bg-neutral-900 bg-white py-4 px-4 border-r border-foreground-200 lg:flex flex-col hidden">
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
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 text-sm ${
              router.pathname === "/app/dashboard" ? "bg-foreground-100" : ""
            }`}
          >
            <RiLayoutMasonryFill
              className={`w-5 mr-2 ${
                router.pathname === "/app/dashboard"
                  ? "text-cyan-500 dark:text-cyan-300"
                  : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/dashboard"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:to-purple-300 font-bold"
                  : ""
              }`}
            >
              Dashboard
            </p>
          </Link>
          <Link
            href="/app/projects"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 text-sm ${
              router.pathname === "/app/projects" ? "bg-foreground-100" : ""
            }`}
          >
            <FaFolder
              className={`w-5 mr-2 ${
                router.pathname === "/app/projects"
                  ? "text-cyan-500 dark:text-cyan-300"
                  : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/projects"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:to-purple-300 font-bold"
                  : ""
              }`}
            >
              Projects
            </p>
          </Link>
          <Link
            href="/app/makespeech"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 text-sm ${
              router.pathname === "/app/makespeech" ? "bg-foreground-100" : ""
            }`}
          >
            <SiAudiomack
              size={20}
              className={`w-5 mr-2 ${
                router.pathname === "/app/makespeech"
                  ? "text-cyan-500 dark:text-cyan-300"
                  : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/makespeech"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:to-purple-300 font-bold"
                  : ""
              }`}
            >
              Speech
            </p>
          </Link>
          <Link
            href="/app/history"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 text-sm ${
              router.pathname === "/app/history" ? "bg-foreground-100" : ""
            }`}
          >
            <FaHistory
              className={`w-5 mr-2 ${
                router.pathname === "/app/history"
                  ? "text-cyan-500 dark:text-cyan-300"
                  : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/history"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:to-purple-300 font-bold"
                  : ""
              }`}
            >
              History
            </p>
          </Link>

          <Link
            href="/app/sqribeclips"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 text-sm ${
              router.pathname === "/app/sqribeclips" ? "bg-foreground-100" : ""
            }`}
          >
            <MdOndemandVideo
              className={`w-5 mr-2 ${
                router.pathname === "/app/sqribeclips"
                  ? "text-cyan-500 dark:text-cyan-300"
                  : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/sqribeclips"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:to-purple-300 font-bold"
                  : ""
              }`}
            >
              Sqribe Clips
            </p>
          </Link>

          {/* <Link
            href="/app/subscription"
            className={`flex items-center text-default-500 hover:text-foreground transition-all font-medium hover:bg-foreground-100 rounded-lg py-2 px-2 text-sm ${
              router.pathname === "/app/subscription" ? "bg-foreground-100" : ""
            }`}
          >
            <FaRegCreditCard
              className={`w-5 mr-2 ${
                router.pathname === "/app/subscription"
                  ? "text-cyan-500 dark:text-cyan-300"
                  : ""
              }`}
            />
            <p
              className={`${
                router.pathname === "/app/subscription"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 dark:to-purple-300 font-bold"
                  : ""
              }`}
            >
              Subscription
            </p>
          </Link> */}
        </div>
      </div>

      <Divider className="bg-foreground-300 mb-3" />
      <DropdownMenuIdk router={router} sidebar={true} />

      {/* <p className="text-foreground text-sm mt-3 ml-2 mb-4">Omar Casey</p> */}
    </div>
  );
};

export default Sidebar;
