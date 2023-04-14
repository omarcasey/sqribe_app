import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-12 bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl xl:max-w-[100rem]">
        <div className="grid items-center grid-cols-1 gap-y-12">
          <h1 className="text-center text-4xl font-light text-white sm:text-5xl lg:text-6xl xl:text-7xl mb-12">
            Get Proven Results
          </h1>
          <div className="grid grid-cols-3 items-center text-center relative gap-x-28">
            <div>
              <h1 className="text-3xl">Discover New Ideas for Business</h1>
              <p className="text-lg text-gray-400 mt-7">
                Amet minim molit non deusarant blabla innit lol haha.
              </p>
            </div>
            <div className="relative">
              <h1 className="text-3xl">Find better opportunities quickly</h1>
              <p className="text-lg text-gray-400 mt-7">
                Amet minim molit non deusarant blabla innit lol haha.
              </p>
              <div className="absolute left-[-17%] w-[1px] top-0 bottom-0 bg-gray-400 opacity-20"></div>
              <div className="absolute right-[-17%] w-[1px] top-0 bottom-0 bg-gray-400 opacity-20"></div>
            </div>
            <div>
              <h1 className="text-3xl">Get proven path for growing business</h1>
              <p className="text-lg text-gray-400 mt-7">
                Amet minim molit non deusarant blabla innit lol haha.
              </p>
            </div>
            <div className="absolute -bottom-12 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500"></div>
          </div>
          <h1 className="text-center text-4xl font-normal text-white px-32 mt-12">
            We have very limited seats for booking calls. If you don&apos;t want to miss a chance, get a seat right now.
          </h1>
          <div className='w-full flex justify-center'>
            <div className="relative inline-flex items-center justify-center group w-48">
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <a href="#" title="" className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white border border-transparent rounded-full" role="button"> Get your free seat </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
