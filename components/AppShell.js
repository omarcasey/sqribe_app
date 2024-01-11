// components/AppShell.js
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Spinner, Switch } from "@nextui-org/react";
import Image from "next/image";
import { RiLayoutMasonryFill } from "react-icons/ri";
import { SiAudiomack } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import DropdownMenuIdk from "./DropdownMenuIdk";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaHistory } from "react-icons/fa";

const AppShell = ({ children }) => {
  const router = useRouter();
  const isDarkMode = useSelector((state) => state.user.data.darkMode);
  const uid = useSelector((state) => state.user.auth.uid);

  const toggleTheme = async () => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.data();
      await updateDoc(userRef, {
        darkMode: !currentData.darkMode,
      });
    } catch (e) {
      console.error("Error updating darkMode: ", e);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        isDarkMode ? "dark" : "light"
      } bg-default-100`}
    >
      <nav className="dark:bg-neutral-900 bg-white px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              className="w-auto h-10 mr-4"
              src="/new logo transparent.png"
              alt=""
              width={1024}
              height={1024}
            />
            <h1 className="text-foreground font-bold text-lg">Sqribe</h1>
          </Link>
          <div className="flex flex-1 max-w-2xl justify-evenly">
            <Link
              href="/dashboard"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
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
              href="/projects"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
            >
              <FaFolder className="mr-2" />
              <p className="">Projects</p>
            </Link>
            <Link
              href="/makespeech"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
            >
              <SiAudiomack
                size={20}
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
                Speech Synthesis
              </p>
            </Link>
            <Link
              href="/history"
              className="flex items-center text-default-500 hover:text-foreground transition-all font-medium"
            >
              <FaHistory className="mr-2" />
              <p className="">History</p>
            </Link>
          </div>
          <div className="flex space-x-3 items-center">
            <Switch
              defaultSelected={isDarkMode}
              size="md"
              color="secondary"
              onChange={toggleTheme}
            />
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
      <main className="flex flex-1 bg-default-100">{children}</main>
      <div className={`fixed bottom-0 left-0 w-full ${isDarkMode ? 'bg-black' : 'bg-white'} bg-opacity-50 h-[6.7rem] backdrop-filter backdrop-blur-sm`}>
        {/* Content for the semi-transparent bar */}
      </div>
    </div>
  );
};

export default AppShell;
