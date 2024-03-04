import Image from "next/image";
import { MdTranslate } from "react-icons/md";

const VideoPreview = () => {
  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-row gap-7">
          <div className="w-1/2 dark:bg-foreground-100 bg-foreground-200 rounded-[3rem] flex flex-col items-center">
            <div className="flex flex-row gap-3 text-lg font-bold mb-5 mt-7">
              <div className="flex flex-row items-center">
                <MdTranslate className="mr-1 text-foreground-400" />
                <p className="text-foreground-400">Translation</p>
              </div>
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
      </div>
    </section>
  );
};

export default VideoPreview;
