import Image from 'next/image';
import React from 'react';

const CallToAction = () => {
  return (
    <section className="pt-24 py-12 sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl xl:max-w-[100rem]">
        <div className="grid items-center grid-cols-1 gap-y-12">
          {/* <h1 className="text-center text-4xl font-light text-foreground sm:text-5xl lg:text-6xl xl:text-6xl mb-6">
            Localize Your Videos
          </h1> */}
          <div className="grid grid-cols-1 gap-3 md:gap-0 md:grid-cols-3 items-center text-center relative">
            <div className='flex items-center justify-center md:border-r border-gray-400 border-opacity-20'>
              <Image src='/voice.png' width={512} height={512} className='h-12 w-12 mr-4 filter -hue-rotate-30' alt='' />
              <h1 className="text-2xl text-foreground">Instant Dubbing</h1>
            </div>
            <div className='flex items-center justify-center md:border-r border-gray-400 border-opacity-20'>
              <Image src='/trending.png' width={512} height={512} className='h-12 w-12 mr-4 filter -hue-rotate-30' alt='' />
              <h1 className="text-2xl text-foreground">Scalable & Affordable</h1>
            </div>
            <div className='flex items-center justify-center'>
              <Image src='/speed.png' width={512} height={512} className='h-12 w-12 mr-4 filter -hue-rotate-30' alt='' />
              <h1 className="text-2xl text-foreground">Quick Turnaround Time</h1>
            </div>
            <div className="absolute -bottom-10 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500"></div>
          </div>
          <h1 className="text-center text-4xl text-foreground px-32 mt-12">
            There&apos;s <span className='font-playfair italic '>no need</span>&nbsp; for translation agencies or other products anymore.
          </h1>
          {/* <div className='w-full flex justify-center'>
            <div className="relative inline-flex items-center justify-center group w-48">
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <a href="#" title="" className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white border border-transparent rounded-full" role="button"> Get Started </a>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
