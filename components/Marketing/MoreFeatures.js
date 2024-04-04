import { Button } from "@nextui-org/react";
import Image from "next/image";
import { MdTranslate } from "react-icons/md";
import { RiScissorsCutLine } from "react-icons/ri";

const MoreFeatures = () => {
  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="w-full grid grid-cols-3 gap-6 mb-12">
          <div className="border border-foreground-300 w-full rounded-3xl h-96">
            <div className="flex flex-col p-8">
              <h2 className="text-foreground text-2xl mb-2">VoiceClone</h2>
              <p className="text-foreground-500 text-sm">
                Communicate with your audience in your own voice in 30 languages
              </p>
            </div>
          </div>
          <div className="border border-foreground-300 w-full rounded-3xl h-96">
            <div className="flex flex-col p-8">
              <h2 className="text-foreground text-2xl mb-2">
                Multi-speaker feature
              </h2>
              <p className="text-foreground-500 text-sm">
                The multi-speaker feature accurately detects the number of
                individuals speaking in a video
              </p>
            </div>
          </div>
          <div className="border border-foreground-300 w-full rounded-3xl h-96">
            <div className="flex flex-col p-8">
              <h2 className="text-foreground text-2xl mb-2">
                Use Lip-Sync to match the translated audio for a pixel-perfect
                viewing experience
              </h2>
              {/* <p className="text-foreground-500 text-sm">Communicate with your audience in your own voice in 30 languages</p> */}
            </div>
          </div>
          <div className="border border-foreground-300 w-full rounded-3xl h-96">
            <div className="flex flex-col p-8">
              <h2 className="text-foreground text-2xl mb-2">
                Auto-generated captions
              </h2>
              <p className="text-foreground-500 text-sm">
                Automatically generate and add captions to your videos for
                improved accessibility
              </p>
            </div>
          </div>
          <div className="border border-foreground-300 w-full rounded-3xl h-96">
            <div className="flex flex-col p-8">
              <h2 className="text-foreground text-2xl mb-2">
                Take your localized audio and video quality to the next level
                with realistic accents and intonations
              </h2>
              {/* <p className="text-foreground-500 text-sm">Communicate with your audience in your own voice in 30 languages</p> */}
            </div>
          </div>
          <div className="border border-foreground-300 w-full rounded-3xl h-96">
            <div className="flex flex-col p-8">
              <h2 className="text-foreground text-2xl mb-2">
                Seamlessly transform text to natural human voices across various
                languages and accents with AI
              </h2>
              {/* <p className="text-foreground-500 text-sm">Communicate with your audience in your own voice in 30 languages</p> */}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button size="lg" color="primary" className="w-44 text-xl">Try it free</Button>
        </div>
      </div>
    </section>
  );
};

export default MoreFeatures;
