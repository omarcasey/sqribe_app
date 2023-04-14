import Image from "next/image"

const LifetimeDeal = () => {
    return (
        <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl xl:max-w-[100rem]">
                <div className="flex flex-col gap-y-8 relative">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase text-xl w-fit">
                        Choose a subscription
                    </p>
                    <h1 className="text-4xl font-light text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                        Make the best investment
                    </h1>
                    <p className="text-xl font-normal text-gray-400 xl:w-[54rem] mb-12">
                        Revolutionize your YouTube videos with AI-generated captions, voice overs, translations, and dubbing in multiple languages.
                    </p>
                    <div className="bg-[#090914] rounded-xl w-full flex p-10 pr-0">
                        <div className="w-2/3 grid grid-cols-2 grid-rows-3 gap-6">
                            <div className="flex">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] mr-4">
                                    <div className="flex w-full h-full rounded-full items-center justify-center bg-[#090914]">
                                        <Image className="h-10 w-10 rounded-full p-[2px]" src='/new logo transparent.png' width={40} height={40} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl text-white mb-1">Automated Captions</p>
                                    <p className="text-gray-500">Accurate AI-generated captions for videos</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] mr-4">
                                    <div className="flex w-full h-full rounded-full items-center justify-center bg-[#090914]">
                                        <Image className="h-10 w-10 rounded-full p-[2px]" src='/new logo transparent.png' width={40} height={40} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl text-white mb-1">Multilingual Translations</p>
                                    <p className="text-gray-500">Translate content into multiple languages</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] mr-4">
                                    <div className="flex w-full h-full rounded-full items-center justify-center bg-[#090914]">
                                        <Image className="h-10 w-10 rounded-full p-[2px]" src='/new logo transparent.png' width={40} height={40} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl text-white mb-1">Realistic Voice Overs</p>
                                    <p className="text-gray-500">AI-driven voice overs in various languages</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] mr-4">
                                    <div className="flex w-full h-full rounded-full items-center justify-center bg-[#090914]">
                                        <Image className="h-10 w-10 rounded-full p-[2px]" src='/new logo transparent.png' width={40} height={40} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl text-white mb-1">Seamless Dubbing</p>
                                    <p className="text-gray-500">Synced multilingual audio for global reach</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] mr-4">
                                    <div className="flex w-full h-full rounded-full items-center justify-center bg-[#090914]">
                                        <Image className="h-10 w-10 rounded-full p-[2px]" src='/new logo transparent.png' width={40} height={40} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl text-white mb-1">Accessibility Features</p>
                                    <p className="text-gray-500">Improve accessibility for diverse audiences</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px] mr-4">
                                    <div className="flex w-full h-full rounded-full items-center justify-center bg-[#090914]">
                                        <Image className="h-10 w-10 rounded-full p-[2px]" src='/new logo transparent.png' width={40} height={40} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl text-white mb-1">Time and Cost Savings</p>
                                    <p className="text-gray-500">Efficient content production with AI</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 border-l border-gray-400 border-opacity-20 flex justify-center items-center ml-2">
                            <div className="flex flex-col items-center gap-y-4 w-full">
                                <h1 className="text-6xl text-white tracking-wide">$99</h1>
                                <p className="text-gray-500">Lifetime Account</p>
                                <button className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-md flex items-center justify-center w-[70%] py-4 text-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50">Buy now</button>
                                <p className="text-gray-500">30 Days Money-back Guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-12 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                </div>
            </div>
        </section>
    )
}

export default LifetimeDeal