import Image from 'next/image'
import { motion } from 'framer-motion'
import React from 'react'

const Hero = () => {
    return (
        <section class="py-12 bg-black sm:pb-16 lg:pb-20 xl:pb-24">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="grid grid-cols-2">
                    <div class="">
                        <p class="text-sm font-normal tracking-widest text-gray-300 uppercase">A HUB FOR YOUTUBERS, CONTENT CREATORS & AGENCIES</p>
                        <h1 class="mt-6 text-4xl font-normal text-white sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl w-[150%]"><span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 relative z-10">AI-Powered<br />Multilingual</span><br /> Content<br /> Solutions</h1>
                        <p class="max-w-lg mt-4 text-xl font-normal text-gray-400 sm:mt-8">Revolutionize your YouTube videos with AI-generated captions, voice overs, translations, and dubbing in multiple languages.</p>
                        <div class="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                            <div class="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                            <a href="#" title="" class="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Join the Waitlist for Early Access </a>
                        </div>
                        <div>
                            <div class="inline-flex items-center pt-6 mt-8 border-t border-gray-800 sm:pt-10 sm:mt-14">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17" stroke="url(#a)" stroke-linecap="round" stroke-linejoin="round" />
                                    <defs>
                                        <linearGradient id="a" x1="3" y1="7.00003" x2="22.2956" y2="12.0274" gradientUnits="userSpaceOnUse">
                                            <stop offset="0%" style={{ stopColor: '#06B6D4' }} />
                                            <stop offset="100%" style={{ stopColor: '#7C3AED' }} />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <span class="ml-2 text-base font-normal text-white"> 42 new multilingual content projects completed last week </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <motion.div
                            animate={{ y: [-10, 10] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            className='w-full'>
                            <Image
                                width={1024}
                                height={1024}
                                className="w-full mx-auto rotate-90 filter contrast-125 hover:-hue-rotate-90 transition-all ease-in-out duration-1000"
                                src="/abstract.png"
                                alt="" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero