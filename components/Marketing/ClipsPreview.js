import { Button } from "@nextui-org/react";
import Image from "next/image";
import { MdTranslate } from "react-icons/md";
import { RiScissorsCutLine } from "react-icons/ri";

const ClipsPreview = () => {
  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="border border-foreground-300 w-full rounded-3xl text-foreground flex flex-row">
          <div className="w-1/2 flex justify-center flex-col px-16 gap-5">
            <p className="text-3xl font-medium">
              Turn your videos into viral
              <br />
              <span className="font-semibold font-serif italic">
                clips in seconds
              </span>
            </p>
            <p className="text-base">
              Expand your global reach and create new revenue streams with
              localized marketing, educational, or entertainment content
            </p>
            <Button color="primary" size="lg" className="w-min mt-6">
              <div className="flex flex-row items-center">
                <RiScissorsCutLine size={20} className="mr-2" />
                Turn video into clips
              </div>
            </Button>
          </div>
          <div className="w-1/2 flex flex-col items-center m-12">
            <Image
              src="/shorts.png"
              width={1000}
              height={1000}
              alt="Drake Don't"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClipsPreview;
