import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen relative pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 xl:pb-24 overflow-hidden" id="hero">
      {/* Background gradient circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-r from-rose-500/30 to-orange-500/30 rounded-full filter blur-[100px]" />
      </div>

      <motion.div 
        className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center">
          {/* <motion.div variants={itemVariants} className="flex items-center space-x-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full px-4 py-2 border border-gray-700">
            <span className="animate-pulse relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-sm font-medium text-gray-300">
              Now with 100+ languages support
            </p>
          </motion.div> */}

          <motion.h1 
            variants={itemVariants}
            className="mt-6 text-4xl font-bold text-foreground sm:mt-10 sm:text-6xl lg:text-7xl xl:text-8xl text-center tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 relative z-10">
              Transform Your Videos
            </span>
            <br />
            <span className="relative">
              Into Global Content
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 25" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 20 Q 100 0 200 20 Q 300 40 400 20" stroke="url(#gradient)" strokeWidth="4" fill="none"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4"/>
                    <stop offset="100%" stopColor="#7c3aed"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mt-8 text-xl font-normal text-gray-400 text-center leading-relaxed"
          >
            Create professional AI-powered voiceovers in minutes. Perfect for YouTube videos,
            e-learning content, and international marketing campaigns.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link
              href="/signup"
              className="relative inline-flex group"
            >
              <div className="absolute transition-all duration-200 rounded-full -inset-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:opacity-100 group-hover:blur-md opacity-70"></div>
              <span className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gray-900 rounded-full">
                Start Creating Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
            </Link>
            
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-300 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors"
            >
              Watch Demo
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-12 flex items-center justify-center space-x-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent bg-clip-text">100+</div>
              <div className="text-sm text-gray-400">Languages</div>
            </div>
            <div className="h-12 w-px bg-gray-800"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent bg-clip-text">1M+</div>
              <div className="text-sm text-gray-400">Minutes Dubbed</div>
            </div>
            <div className="h-12 w-px bg-gray-800"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent bg-clip-text">10k+</div>
              <div className="text-sm text-gray-400">Happy Creators</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
