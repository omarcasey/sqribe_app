import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import ThemeSwitch from "../App/ThemeSwitch";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiOutlineGlobeAlt, HiSparkles, HiArrowUpRight } from "react-icons/hi2";
import { RiMenu4Fill, RiCloseFill } from "react-icons/ri";

const navigationItems = {
  useCases: {
    name: "Use Cases",
    items: [
      { name: "Education Videos", href: "/use-cases/education" },
      { name: "Marketing", href: "/use-cases/marketing" },
      { name: "Content Creation", href: "/use-cases/content-creation" },
      { name: "Training", href: "/use-cases/training" },
      { name: "Explainers", href: "/use-cases/explainers" },
      { name: "Sales Videos", href: "/use-cases/sales" },
      { name: "Youtube Content", href: "/use-cases/youtube" }
    ]
  },
  features: {
    name: "Features",
    items: [
      { name: "Transcribe Youtube", href: "/features/transcribe-youtube-video" },
      { name: "Video to Text", href: "/features/video-to-text" },
      { name: "Audio Translator", href: "/features/audio-translator" },
      { name: "Audio to Text", href: "/features/convert-audio-to-text" },
      { name: "Translation", href: "/features/translation" },
      { name: "Text to Speech", href: "/features/text-to-speech" },
      { name: "Speech to Text", href: "/features/speech-to-text" },
      { name: "Subtitles & Captions", href: "/features/subtitles" }
    ]
  },
  roles: {
    name: "Roles",
    items: [
      { name: "Educators", href: "/roles/educators" },
      { name: "Marketers", href: "/roles/marketers" },
      { name: "Content Creators", href: "/roles/creators" },
      { name: "Podcasters", href: "/roles/podcasters" },
      { name: "Businesses", href: "/roles/businesses" },
      { name: "HR Teams", href: "/roles/hr" },
      { name: "Film Dubbing", href: "/roles/film-dubbing" }
    ]
  }
};

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY > 20) setActiveDropdown(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (section) => {
    setActiveDropdown(section);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveMobileSection(null);
  };

  const toggleMobileSection = (section) => {
    setActiveMobileSection(activeMobileSection === section ? null : section);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/30 backdrop-blur-xl border-b border-gray-800/50`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/new logo transparent.png"
              alt="Sqribe Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              Sqribe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.entries(navigationItems).map(([key, section]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(key)}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="group flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  <span className="relative">
                    {section.name}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                  </span>
                  <HiChevronDown className={`w-4 h-4 transition-transform text-purple-500 group-hover:text-pink-500 ${
                    activeDropdown === key ? "rotate-180" : ""
                  }`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 mt-2"
                    >
                      <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                        <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-lg">
                          <div className="p-2">
                            {section.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              href="/pricing"
              className="group text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <span className="relative">
                Pricing
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </span>
            </Link>

            <Link
              href="/blog"
              className="group text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <span className="relative">
                Blog
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <ThemeSwitch />
            </div>

            <Link
              href={user ? "/app/dashboard" : "/signin"}
              className="relative inline-flex group"
            >
              <div className="absolute transition-all duration-200 rounded-full -inset-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:opacity-100 group-hover:blur-md opacity-70" />
              <span className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900/90 backdrop-blur-sm rounded-full">
                {user ? "Dashboard" : "Sign In"}
                <HiArrowUpRight className="ml-2 w-4 h-4 text-purple-500 group-hover:text-pink-500" />
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-300 hover:text-white md:hidden"
            >
              {isMobileMenuOpen ? (
                <RiCloseFill className="w-6 h-6" />
              ) : (
                <RiMenu4Fill className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50"
          >
            <div className="px-4 py-6 space-y-4 divide-y divide-gray-800/50">
              {Object.entries(navigationItems).map(([key, section]) => (
                <div key={key} className="pt-4 first:pt-0">
                  <button
                    onClick={() => toggleMobileSection(key)}
                    className="flex items-center justify-between w-full text-left text-gray-300 hover:text-white"
                  >
                    <span className="text-sm font-medium">{section.name}</span>
                    <HiChevronDown className={`w-4 h-4 transition-transform text-purple-500 ${
                      activeMobileSection === key ? "rotate-180" : ""
                    }`} />
                  </button>

                  <AnimatePresence>
                    {activeMobileSection === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-2 relative p-[1px] rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
                      >
                        <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-lg p-2">
                          {section.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="pt-4">
                <Link
                  href="/pricing"
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  Pricing
                </Link>
              </div>

              <div className="pt-4">
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  Blog
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <ThemeSwitch />
                <Link
                  href={user ? "/app/dashboard" : "/signin"}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:opacity-90 transition-opacity"
                >
                  {user ? "Dashboard" : "Sign In"}
                  <HiArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
