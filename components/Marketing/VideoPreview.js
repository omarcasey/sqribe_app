import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdTranslate } from "react-icons/md";

const VideoPreview = () => {
  const [videoMode, setVideoMode] = useState("translation");

  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center">
        <div className="flex flex-col lg:flex-row gap-7">
          <div className="lg:w-1/2 dark:bg-foreground-100 bg-foreground-200 rounded-xl md:rounded-3xl lg:rounded-[3rem] flex flex-col items-center">
            <div className="flex flex-row gap-3 text-sm md:text-lg font-bold mb-5 md:mb-0 mt-5 sm:mt-7">
              <button
                className="flex flex-row items-center"
                onClick={() => setVideoMode("translation")}
              >
                <MdTranslate
                  className={`mr-1 ${
                    videoMode === "translation"
                      ? "text-foreground"
                      : "text-foreground-400"
                  } transition-all`}
                />
                <p
                  className={`${
                    videoMode === "translation"
                      ? "text-foreground"
                      : "text-foreground-400"
                  } transition-all`}
                >
                  Translation
                </p>
              </button>
              <button
                className={`${
                  videoMode === "translation"
                    ? "text-foreground-400"
                    : "text-foreground"
                } transition-all`}
                onClick={() => setVideoMode("original")}
              >
                Original video
              </button>
            </div>
            <div className="p-4 md:p-8 pt-0 ">
              {videoMode === "translation" ? (
                <motion.video
                  key={"123"}
                  src="https://firebasestorage.googleapis.com/v0/b/sqribe-app.appspot.com/o/dubbed%2F1711656677758.mp4?alt=media&token=985109e5-63fc-4258-9398-3eb65442c725"
                  // controls
                  className={`w-full rounded-xl md:rounded-3xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                />
              ) : (
                <motion.video
                  key={"456"}
                  src="https://firebasestorage.googleapis.com/v0/b/sqribe-app.appspot.com/o/uploads%2FGermany's%20new%20censorship%20law%20explained%20in%2030%20seconds.mp4?alt=media&token=a4916335-a2e9-427c-9f9b-cffeed41ca86"
                  // controls
                  className={`w-full rounded-xl md:rounded-3xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                />
              )}
            </div>
          </div>
          <div className="lg:w-1/2 dark:bg-foreground-100 bg-foreground-200 rounded-xl md:rounded-3xl lg:rounded-[3rem] flex flex-col items-center">
            <div className="flex flex-row gap-3 text-sm md:text-lg font-bold mb-5 md:mb-0 mt-5 sm:mt-7">
              <button className="flex flex-row items-center">
                <MdTranslate className="mr-1 text-foreground-400" />
                <p className="text-foreground-400">Clips Beta</p>
              </button>
              <button className="text-foreground">Original video</button>
            </div>
            <div className="p-4 md:p-8 pt-0">
              <Image
                src="/drakedont.png"
                width={1000}
                height={1000}
                alt="Drake Don't"
                className="rounded-xl md:rounded-3xl"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="inline-flex items-center pt-6 mt-8 border-t border-gray-800 sm:pt-10 sm:mt-14">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17"
                stroke="url(#a)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="3"
                  y1="7.00003"
                  x2="22.2956"
                  y2="12.0274"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" style={{ stopColor: "#06B6D4" }} />
                  <stop offset="100%" style={{ stopColor: "#7C3AED" }} />
                </linearGradient>
              </defs>
            </svg>
            <span className="ml-2 text-sm md:text-base font-normal text-foreground">
              {" "}
              1000+ new multilingual content projects completed last week{" "}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;
