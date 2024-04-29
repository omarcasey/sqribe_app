import { Button } from "@nextui-org/react";
import Image from "next/image";
import { MdTranslate } from "react-icons/md";

const TranslationPreview = () => {
  return (
    <section className="md:pt-0">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-center w-full">
          <p className="text-3xl md:text-4xl text-foreground md:text-[2.8rem] max-w-4xl text-center mb-20">
            Maximize your impact by{" "}
            <span className="italic font-serif font-medium">localizing</span>{" "}
            and{" "}
            <span className="italic font-serif font-medium">repurposing</span>{" "}
            marketing videos, lectures, podcasts, and more
          </p>
        </div>
        <div className="border border-foreground-300 w-full rounded-xl md:rounded-3xl text-foreground flex flex-col md:flex-row p-3.5 md:p-0">
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="flex flex-row gap-4 text-base font-bold mb-5 mt-3 md:mt-7">
              <div className="flex flex-row items-center">
                <MdTranslate className="mr-1 text-foreground-400" />
                <p className="text-foreground-400">Translation</p>
              </div>
              <p className="text-foreground">Original video</p>
            </div>
            <div className="md:px-8">
              <Image
                src="/talking.jpg"
                width={1000}
                height={1000}
                alt="Drake Don't"
                className="rounded-xl md:rounded-3xl"
              />
            </div>
            <div className="flex flex-row gap-5 text-sm font-semibold mb-6 mt-4 md:mt-8 px-2 md:px-8 overflow-x-auto w-full pb-2 xl:justify-center">
              <p className="text-foreground">Marketing</p>
              <p className="text-foreground-400">Educational</p>
              <p className="text-foreground-400 whitespace-nowrap">Media & Entertainment</p>
              <p className="text-foreground-400 whitespace-nowrap">Creative Content</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center md:items-start justify-center flex-col md:px-16 gap-5">
            <p className="text-2xl tracking-tighter md:tracking-normal md:text-3xl font-medium leading-none">
              Automatically translate video
              <br />& audio{" "}
              <span className="italic">
                <span className="font-semibold font-serif">into</span> 130+{" "}
                <span className="font-semibold font-serif">languages.</span>
              </span>
            </p>
            <p className="text-sm font-medium md:text-base ml-1 text-foreground-600">
              Expand your global reach and create new revenue streams with
              localized marketing, educational, or entertainment content
            </p>
            <Button color="primary" size="lg" className="md:w-min mt-4 md:mt-6 w-full saturate-200 bg-blue-800">
              <div className="flex flex-row items-center">
                <MdTranslate size={18} className="mr-2" />
                Translate video & audio
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslationPreview;
