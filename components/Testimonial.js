import Image from "next/image"


const Testimonial = () => {
    return (
        <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl xl:max-w-[100rem]">
                <div className="flex flex-col items-center">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 uppercase text-xl mb-4">2K+ Happy Customers</p>
                    <h1 className="text-center text-4xl font-light text-white sm:text-5xl lg:text-6xl xl:text-7xl xl:w-[48rem] mb-12">
                        Users love Sqribe
                    </h1>
                    <div className="mb-12">
                        <div className="flex gap-x-6 mb-6 mr-12">
                            <div className="flex bg-[#18181b] rounded-[3.5rem] p-6 items-center">
                                <Image className="h-16 w-16 rounded-full mr-4" src='/logo.png' width={1024} height={1024} />
                                <p className="text-white">sample testy testy testy testy testy testy testy testy sample testy testy testy testy</p>
                            </div>
                            <div className="flex bg-[#18181b] rounded-[3.5rem] p-6 items-center">
                                <Image className="h-16 w-16 rounded-full mr-4" src='/logo.png' width={1024} height={1024} />
                                <p className="text-white">sample testy testy testy testy testy testy testy testy sample testy testy testy testy</p>
                            </div>
                            <div className="flex bg-[#18181b] rounded-[3.5rem] p-6 items-center">
                                <Image className="h-16 w-16 rounded-full mr-4" src='/logo.png' width={1024} height={1024} />
                                <p className="text-white">sample testy testy testy testy testy testy testy testy sample testy testy testy testy</p>
                            </div>
                        </div>
                        <div className="flex gap-x-6 mb-4 ml-12">
                            <div className="flex bg-[#18181b] rounded-[3.5rem] p-6 items-center">
                                <Image className="h-16 w-16 rounded-full mr-4" src='/logo.png' width={1024} height={1024} />
                                <p className="text-white">sample testy testy testy testy testy testy testy testy sample testy testy testy testy</p>
                            </div>
                            <div className="flex bg-[#18181b] rounded-[3.5rem] p-6 items-center">
                                <Image className="h-16 w-16 rounded-full mr-4" src='/logo.png' width={1024} height={1024} />
                                <p className="text-white">sample testy testy testy testy testy testy testy testy sample testy testy testy testy</p>
                            </div>
                            <div className="flex bg-[#18181b] rounded-[3.5rem] p-6 items-center">
                                <Image className="h-16 w-16 rounded-full mr-4" src='/logo.png' width={1024} height={1024} />
                                <p className="text-white">sample testy testy testy testy testy testy testy testy sample testy testy testy testy</p>
                            </div>
                        </div>
                    </div>
                    <div className="gradient-underline">
                        <p className="text-white text-xl">Read All Reviews</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial