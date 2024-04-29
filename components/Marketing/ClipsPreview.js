import { Button } from "@nextui-org/react";
import { RiScissorsCutLine } from "react-icons/ri";
import Image from "next/image";

const ClipsPreview = () => {
  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="border border-foreground-300 w-full rounded-xl md:rounded-3xl text-foreground flex flex-col md:flex-row p-3.5 md:p-0">
          <div className="w-full md:w-1/2 flex flex-col items-center md:m-12 md:order-2">
            {" "}
            {/* Reorder based on screen size */}
            <video
              src="/viralshorts.mp4"
              width={1000}
              height={1000}
              alt="Viral Shorts"
              className="rounded-xl flex"
              autoPlay
              loop
              preload="auto"
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-center flex-col md:px-16 gap-5 md:order-1 mt-6 md:mt-0">
            <p className="text-2xl tracking-tighter md:tracking-normal md:text-3xl font-medium ml-1 leading-none">
              Turn your videos into viral
              <br />
              <span className="font-semibold font-serif italic">
                clips in seconds
              </span>
            </p>
            <p className="text-sm font-medium md:text-base ml-1 text-foreground-600">
              Upload your existing videos and let our AI choose the highlights
              and create bite-sized social media content
            </p>
            <Button color="primary" size="lg" className="md:w-min mt-4 md:mt-6 w-full saturate-200 bg-blue-800">
              <div className="flex flex-row items-center">
                <RiScissorsCutLine size={20} className="mr-2" />
                Turn video into clips
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClipsPreview;
