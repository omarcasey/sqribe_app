import Image from "next/image"

const Features = () => {
    return (
        <section className="py-12 bg-black sm:pb-16 lg:pb-20 xl:pb-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl xl:max-w-[70%]">
                <div className="flex flex-col items-center gap-y-12">
                    <h1 className="text-center text-4xl font-light text-white sm:text-5xl lg:text-6xl xl:text-7xl xl:w-[48rem]">
                        Stay informed & inspired wherever you are
                    </h1>
                    <p className="text-center text-xl font-normal text-gray-400 xl:w-[54rem] mb-12">
                        Revolutionize your YouTube videos with AI-generated captions, voice overs, translations, and dubbing in multiple languages.
                    </p>
                    <div className="grid grid-cols-3 items-center text-center relative gap-x-10">
                    <div className="bg-[#090914] hover:bg-slate-950 transition-all ease-in-out duration-300 rounded-xl p-16 h-[34rem] flex flex-col items-center">
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase mb-4 text-xl">Unlimited Resources</p>
                            <h1 className="text-3xl font-light xl:text-4xl mb-7">Captions & Subtitles</h1>
                            <p className="text-gray-400 text-base">
                                Lorem ipsum dolor sit amet, meliore mediocritatem ad ius. Cu mel fabellas philosophia, eu labitur sensibus sit, ea clita numquam probatus vis.
                            </p>
                            <Image className="h-60 w-auto" src='/new logo transparent.png' width={1024} height={1024} />
                        </div>
                        <div className="bg-[#090914] hover:bg-slate-950 transition-all ease-in-out duration-300 rounded-xl p-16 h-[34rem] flex flex-col items-center">
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase mb-4 text-xl">Unlimited Growth</p>
                            <h1 className="text-3xl font-light xl:text-4xl mb-7">Translating & Dubbing</h1>
                            <p className="text-gray-400 text-base">
                                Lorem ipsum dolor sit amet, meliore mediocritatem ad ius. Cu mel fabellas philosophia, eu labitur sensibus sit, ea clita numquam probatus vis.
                            </p>
                            <Image className="h-60 w-auto" src='/new logo transparent.png' width={1024} height={1024} />
                        </div>
                        <div className="bg-[#090914] hover:bg-slate-950 transition-all ease-in-out duration-300 rounded-xl p-16 h-[34rem] flex flex-col items-center">
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase mb-4 text-xl">Unlimited Content</p>
                            <h1 className="text-3xl font-light xl:text-4xl mb-7">Voice Overs</h1>
                            <p className="text-gray-400 text-base">
                                Lorem ipsum dolor sit amet, meliore mediocritatem ad ius. Cu mel fabellas philosophia, eu labitur sensibus sit, ea clita numquam probatus vis.
                            </p>
                            <Image className="h-60 w-auto" src='/new logo transparent.png' width={1024} height={1024} />
                        </div>
                        <div className="absolute -bottom-12 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features