import Image from "next/image";
import Link from "next/link";
import { MdTranslate } from "react-icons/md";

const VideoPreview = () => {
  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl flex flex-col items-center">
        <div className="flex flex-row gap-7">
          <div className="w-1/2 dark:bg-foreground-100 bg-foreground-200 rounded-[3rem] flex flex-col items-center">
            <div className="flex flex-row gap-3 text-lg font-bold mb-5 mt-7">
              <button className="flex flex-row items-center">
                <MdTranslate className="mr-1 text-foreground-400" />
                <p className="text-foreground-400">Translation</p>
              </button>
              <p className="text-foreground">Original video</p>
            </div>
            <div className="p-8 pt-0 ">
              <Image
                src="/drakedont.png"
                width={1000}
                height={1000}
                alt="Drake Don't"
                className="rounded-3xl"
              />
            </div>
          </div>
          <div className="w-1/2 dark:bg-foreground-100 bg-foreground-200 rounded-[3rem] flex flex-col items-center">
            <div className="flex flex-row gap-3 text-lg font-bold my-5">
              <div className="flex flex-row items-center">
                <MdTranslate className="mr-1 text-foreground-400" />
                <p className="text-foreground-400">Clips Beta</p>
              </div>
              <p className="text-foreground">Original video</p>
            </div>
            <div className="p-8 pt-0">
              <Image
                src="/drakedont.png"
                width={1000}
                height={1000}
                alt="Drake Don't"
                className="rounded-3xl"
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
              <span className="ml-2 text-base font-normal text-foreground">
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
