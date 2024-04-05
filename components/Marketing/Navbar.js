import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import ThemeSwitch from "../App/ThemeSwitch";
import { motion } from "framer-motion";
import { dropdown } from "@nextui-org/react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(false);
      } else {
        setUser(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (router.pathname === "/") {
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      setShowDropdown(false); // Close dropdown when scrolling
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="py-4 sm:py-3 border-b-2 border-gray-800 z-[100] sticky top-0 bg-opacity-0 backdrop-blur-md transition-all duration-300">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="shrink-0">
            <Link href="/" onClick={handleClick} className="flex items-center">
              <Image
                className="w-auto h-16 mr-4"
                src="/new logo transparent.png"
                alt=""
                width={1024}
                height={1024}
              />
              <h1 className="text-foreground font-extrabold text-3xl tracking-tight">
                Sqribe
              </h1>
            </Link>
          </div>

          <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-start md:justify-start mt-3">
            <div
              className="relative "
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
            >
              <a
                href="#"
                title=""
                className={`text-lg font-semibold transition-all duration-200 hover:text-foreground ${showDropdown && "gradient-underline"}`}
              >
                {" "}
                Use Cases{" "}
              </a>
              <div className=" pb-2"></div>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} // Add exit animation for fade-out
                  transition={{ duration: 0.2 }} // Set duration for fade-out
                  className="absolute top-full left-0 w-80 bg-white dark:bg-black border border-blue-500 shadow-md z-10"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Education Videos
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Marketing
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Content Creation & Distribution
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Employee & Customer Training
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Explainers
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Sales Videos
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Youtube Multilingual Content
                  </a>
                </motion.div>
              )}
            </div>

            <a
              href="#"
              title=""
              className={`text-lg font-semibold transition-all duration-200 hover:text-foreground hover-underline`}
            >
              {" "}
              Features{" "}
            </a>

            <a
              href="#"
              title=""
              className={`text-lg font-semibold transition-all duration-200 hover:text-foreground hover-underline`}
            >
              {" "}
              Roles{" "}
            </a>

            <Link
              href="/pricing"
              className={`text-lg font-semibold transition-all duration-200 hover:text-foreground hover-underline`}
            >
              {" "}
              Pricing{" "}
            </Link>

            <a
              href="#"
              title=""
              className={`text-lg font-semibold transition-all duration-200 hover:text-foreground hover-underline`}
            >
              {" "}
              Blog{" "}
            </a>
          </nav>
          <div className="mr-6 mt-1 hidden">
            <ThemeSwitch />
          </div>
          <Link
            href={user ? "/app/dashboard" : "/signin"}
            className="relative md:items-center md:justify-center md:inline-flex group"
          >
            <div className="absolute transition-all duration-200 rounded-full -inset-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <div className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-foreground bg-foreground-50 border border-transparent rounded-full">
              {" "}
              Sign In{" "}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
