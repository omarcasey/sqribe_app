import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import ThemeSwitch from "../App/ThemeSwitch";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the sign-in page if the user is not signed in
        setUser(false);
      } else {
        setUser(true);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // If current route is home page, scroll to top
  const handleClick = (e) => {
    e.preventDefault();
    if (router.pathname === "/") {
      document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`py-4 sm:py-3 border-b-2 border-gray-800 z-[100] sticky top-0 bg-opacity-0 backdrop-blur-md transition-all duration-300 ${
        scrolling ? "bg-black" : ""
      }`}
    >
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

          <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
            <a
              href="#"
              title=""
              className={`text-lg font-semibold ${
                scrolling ? "text-foreground" : "text-foreground-500"
              } transition-all duration-200 hover:text-foreground hover-underline`}
            >
              {" "}
              Products{" "}
            </a>

            <a
              href="#"
              title=""
              className={`text-lg font-semibold ${
                scrolling ? "text-foreground" : "text-foreground-500"
              } transition-all duration-200 hover:text-foreground hover-underline`}
            >
              {" "}
              Use Cases{" "}
            </a>

            <Link
              href="/pricing"
              className={`text-lg font-semibold ${
                scrolling ? "text-foreground" : "text-foreground-500"
              } transition-all duration-200 hover:text-foreground ${
                router.pathname === "/pricing"
                  ? "gradient-underline"
                  : "hover-underline"
              }`}
            >
              {" "}
              Pricing{" "}
            </Link>

            <a
              href="#"
              title=""
              className={`text-lg font-semibold ${
                scrolling ? "text-foreground" : "text-foreground-500"
              } transition-all duration-200 hover:text-foreground hover-underline`}
            >
              {" "}
              Blog{" "}
            </a>
          </nav>
          <div className="mr-6 mt-1">
            <ThemeSwitch />
          </div>
          <Link
            href={user ? "/app/dashboard" : "/signin"}
            className="relative hidden md:items-center md:justify-center md:inline-flex group"
          >
            <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
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
