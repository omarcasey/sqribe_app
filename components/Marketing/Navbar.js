import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import ThemeSwitch from "../App/ThemeSwitch";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [showDropdown, setShowDropdown] = useState(""); // State to manage dropdown visibility
  const [dropdownRotation, setDropdownRotation] = useState({}); // State to manage dropdown rotation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(!!user);
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
      // setShowDropdown(""); // Close dropdown when scrolling
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (dropdownName) => {
    setShowDropdown(showDropdown === dropdownName ? "" : dropdownName);
    setDropdownRotation({
      ...dropdownRotation,
      [dropdownName]: showDropdown === dropdownName ? "" : "rotate-180",
    });
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
              className="relative"
              onMouseEnter={() => handleDropdownToggle("useCases")}
              onMouseLeave={() => handleDropdownToggle("useCases")}
            >
              <a
                href="#"
                title=""
                className={`text-lg text-foreground hover:text-foreground-800 hover-underline font-semibold transition-all duration-200 group`}
              >
                Use Cases
                <IoIosArrowDown
                  className={`inline-block ml-1 text-blue-600 group-hover:rotate-180 transition-transform ${
                    dropdownRotation["useCases"] || "" // Apply rotation class based on state
                  }`}
                />
              </a>
              <div className=" pb-2"></div>
              {showDropdown === "useCases" && (
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

            <div
              className="relative"
              onMouseEnter={() => handleDropdownToggle("features")}
              onMouseLeave={() => handleDropdownToggle("features")}
            >
              <a
                href="#"
                title=""
                className={`text-lg text-foreground hover:text-foreground-800 hover-underline group font-semibold transition-all duration-200`}
              >
                Features
                <IoIosArrowDown
                  className={`inline-block ml-1 text-blue-600 group-hover:rotate-180 transition-transform ${
                    dropdownRotation["features"] || "" // Apply rotation class based on state
                  }`}
                />
              </a>
              <div className=" pb-2"></div>
              {showDropdown === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} // Add exit animation for fade-out
                  transition={{ duration: 0.2 }} // Set duration for fade-out
                  className="absolute top-full left-0 w-80 bg-white dark:bg-black border border-blue-500 shadow-md z-10"
                >
                  <Link
                    href="/features/transcribe-youtube-video"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Transcribe Youtube Videos
                  </Link>
                  <Link
                    href="/features/video-to-text"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Video to text
                  </Link>
                  <Link
                    href="/features/audio-translator"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Audio Translator
                  </Link>
                  <Link
                    href="/features/convert-audio-to-text"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Convert Audio To Text
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Translation
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Text to Speech
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Speech to Text
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Subtitles & Captions
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Add SRT to MP4
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Add Subtitles to Video
                  </a>
                </motion.div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleDropdownToggle("roles")}
              onMouseLeave={() => handleDropdownToggle("roles")}
            >
              <a
                href="#"
                title=""
                className={`text-lg text-foreground hover:text-foreground-800 hover-underline group font-semibold transition-all duration-200`}
              >
                Roles
                <IoIosArrowDown
                  className={`inline-block ml-1 text-blue-600 group-hover:rotate-180 transition-transform ${
                    dropdownRotation["roles"] || "" // Apply rotation class based on state
                  }`}
                />
              </a>
              <div className=" pb-2"></div>
              {showDropdown === "roles" && (
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
                    Educators & Teachers
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Marketers
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Content Creators
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Podcasters
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Businesses
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Human Resources
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-foreground-700 hover:bg-foreground-100"
                  >
                    Film Dubbing
                  </a>
                </motion.div>
              )}
            </div>

            <Link
              href="/pricing"
              className={`text-lg text-foreground font-semibold transition-all duration-200 hover:text-foreground-800 hover-underline`}
            >
              {" "}
              Pricing{" "}
            </Link>

            <a
              href="#"
              title=""
              className={`text-lg text-foreground font-semibold transition-all duration-200 hover:text-foreground-800 hover-underline`}
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
