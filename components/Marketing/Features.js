import Image from "next/image";

const Features = () => {
  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl xl:max-w-[100rem]">
        <div className="flex flex-col items-center gap-y-12">
          {/* <h1 className="text-center text-4xl font-light text-white sm:text-5xl lg:text-6xl xl:w-[48rem]">
            How We Can Help
          </h1> */}
          {/* <p className="text-center text-xl font-normal text-gray-400 xl:w-[54rem] mb-12">
            Revolutionize your videos with AI-generated captions, voice
            overs, translations, and dubbing in multiple languages.
          </p> */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center relative gap-4 md:gap-10">
            <div className="border border-foreground-300 transition-all ease-in-out duration-300 rounded-xl md:rounded-3xl p-4 md:p-12 h-full flex flex-col items-center justify-between">
              <div className="flex flex-col">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase mb-2 md:mb-4 text-lg md:text-xl">
                  Unlimited Resources
                </p>
                <h1 className="text-2xl md:text-3xl text-foreground font-light xl:text-4xl mb-4 md:mb-7 tracking-tight">
                  Captions & Subtitles
                </h1>
                <p className="text-foreground-500 text-sm md:text-base">
                  Lorem ipsum dolor sit amet, meliore mediocritatem ad ius. Cu
                  mel fabellas philosophia, eu labitur sensibus sit, ea clita
                  numquam probatus vis.
                </p>
              </div>
              <Image
                className="md:h-60 w-auto rounded-xl md:rounded-3xl mt-10"
                src="/drakedont.png"
                width={1024}
                height={1024}
                alt=""
              />
            </div>
            <div className=" border border-foreground-300 transition-all ease-in-out duration-300 rounded-xl md:rounded-3xl p-4 md:p-12 h-full flex flex-col items-center justify-between">
              <div className="flex flex-col">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase mb-2 md:mb-4 text-lg md:text-xl">
                  Unlimited Growth
                </p>
                <h1 className="text-2xl md:text-3xl text-foreground font-light xl:text-4xl mb-4 md:mb-7 tracking-tight">
                  Translating & Dubbing
                </h1>
                <p className="text-foreground-500 text-sm md:text-base">
                  Lorem ipsum dolor sit amet, meliore mediocritatem ad ius. Cu
                  mel fabellas philosophia, eu labitur sensibus sit, ea clita
                  numquam probatus vis.
                </p>
              </div>
              <Image
                className="md:h-60 w-auto rounded-xl md:rounded-3xl mt-10"
                src="/drakedont.png"
                width={1024}
                height={1024}
                alt=""
              />
            </div>
            <div className=" border border-foreground-300 transition-all ease-in-out duration-300 rounded-xl md:rounded-3xl p-4 md:p-12 h-full flex flex-col items-center justify-between">
              <div className="flex flex-col">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase mb-2 md:mb-4 text-lg md:text-xl">
                  Unlimited Content
                </p>
                <h1 className="text-2xl md:text-3xl text-foreground font-light xl:text-4xl mb-4 md:mb-7 tracking-tight">
                  Voice Overs
                </h1>
                <p className="text-foreground-500 text-sm md:text-base">
                  Lorem ipsum dolor sit amet, meliore mediocritatem ad ius. Cu
                  mel fabellas philosophia, eu labitur sensibus sit, ea clita
                  numquam probatus vis.
                </p>
              </div>
              <Image
                className="md:h-60 w-auto rounded-xl md:rounded-3xl mt-10"
                src="/drakedont.png"
                width={1024}
                height={1024}
                alt=""
              />
            </div>
            <div className="absolute -bottom-12 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
