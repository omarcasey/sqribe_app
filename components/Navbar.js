import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

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
      className={`py-4 sm:py-6 border-b-2 border-gray-800 z-[100] sticky top-0 bg-opacity-0 backdrop-blur-md transition-all duration-300 ${
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
              <h1 className="text-white font-bold text-xl tracking-widest">
                Sqribe
              </h1>
            </Link>
          </div>

          {/* <div className="flex md:hidden">
                    <button type="button" className="text-white" @click="expanded = !expanded" :aria-expanded="expanded">
                        <span x-show="!expanded" aria-hidden="true">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </span>

                        <span x-show="expanded" aria-hidden="true">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </button>
                </div> */}

          <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
            <a
              href="#"
              title=""
              className={`text-lg font-semibold ${
                scrolling ? "text-white" : "text-gray-400"
              } transition-all duration-200 hover:text-white hover-underline`}
            >
              {" "}
              Products{" "}
            </a>

            <a
              href="#"
              title=""
              className={`text-lg font-semibold ${
                scrolling ? "text-white" : "text-gray-400"
              } transition-all duration-200 hover:text-white hover-underline`}
            >
              {" "}
              Use Cases{" "}
            </a>

            <Link
              href="/pricing"
              className={`text-lg font-semibold ${
                scrolling ? "text-white" : "text-gray-400"
              } transition-all duration-200 hover:text-white ${
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
                scrolling ? "text-white" : "text-gray-400"
              } transition-all duration-200 hover:text-white hover-underline`}
            >
              {" "}
              Blog{" "}
            </a>
          </nav>

          {user ? (
            <Link
              href="/dashboard"
              className="relative hidden md:items-center md:justify-center md:inline-flex group"
            >
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              {/* <a onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })} className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#0e1015] border border-transparent rounded-full" role="button"> Join Waitlist </a> */}
              <div className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#0e1015] border border-transparent rounded-full">
                {" "}
                Go To App{" "}
              </div>
            </Link>
          ) : (
            <Link
              href="/signin"
              className="relative hidden md:items-center md:justify-center md:inline-flex group"
            >
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              {/* <a onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })} className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#0e1015] border border-transparent rounded-full" role="button"> Join Waitlist </a> */}
              <div className="relative inline-flex items-center justify-center px-6 py-2 text-base font-normal text-white bg-[#0e1015] border border-transparent rounded-full">
                {" "}
                Sign In{" "}
              </div>
            </Link>
          )}
        </div>

        {/* <nav x-show="expanded" x-collapse>
                <div className="flex flex-col pt-8 pb-4 space-y-6">
                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Products </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Features </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Pricing </a>

                    <a href="#" title="" className="text-base font-normal text-gray-400 transition-all duration-200 hover:text-white"> Support </a>

                    <div className="relative inline-flex items-center justify-center group">
                        <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                        <a href="#" title="" className="relative inline-flex items-center justify-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Start free trial </a>
                    </div>
                </div>
            </nav> */}
      </div>
    </header>
  );
};

export default Navbar;
