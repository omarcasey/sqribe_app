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
        <div className="border border-foreground-300 w-full rounded-3xl text-foreground flex flex-row">
          <div className="w-1/2 flex flex-col items-center">
            <div className="flex flex-row gap-3 text-base font-bold mb-5 mt-7">
              <div className="flex flex-row items-center">
                <MdTranslate className="mr-1 text-foreground-400" />
                <p className="text-foreground-400">Translation</p>
              </div>
              <p className="text-foreground">Original video</p>
            </div>
            <div className="px-8 ">
              <Image
                src="/talking.jpg"
                width={1000}
                height={1000}
                alt="Drake Don't"
                className="rounded-3xl"
              />
            </div>
            <div className="flex flex-row gap-5 text-sm font-bold my-8 px-4">
              <p className="text-foreground">Marketing</p>
              <p className="text-foreground-400">Educational</p>
              <p className="text-foreground-400">Media & Entertainment</p>
              <p className="text-foreground-400">Creative Content</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-center flex-col px-16 gap-5">
            <p className="text-3xl font-medium">
              Automatically translate video
              <br />& audio{" "}
              <span className="italic">
                <span className="font-semibold font-serif">into</span> 130+{" "}
                <span className="font-semibold font-serif">languages.</span>
              </span>
            </p>
            <p className="text-base">
              Expand your global reach and create new revenue streams with
              localized marketing, educational, or entertainment content
            </p>
            <Button color="primary" size="lg" className="w-min mt-6">
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
