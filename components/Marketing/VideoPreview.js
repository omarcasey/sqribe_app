import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdTranslate, MdPlayCircle } from "react-icons/md";
import { HiLanguage } from "react-icons/hi2";
import { BsPlayCircle, BsPauseCircle } from "react-icons/bs";

const VideoPreview = () => {
  const [videoMode, setVideoMode] = useState("translation");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleVideoClick = (videoRef) => {
    if (videoRef === activeVideo) {
      if (isPlaying) {
        activeVideo.pause();
      } else {
        activeVideo.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (activeVideo) {
        activeVideo.pause();
      }
      videoRef.play();
      setActiveVideo(videoRef);
      setIsPlaying(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 text-transparent bg-clip-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Transform Your Content Globally
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Watch how our AI transforms videos into different languages while preserving the original voice characteristics
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-7">
          <motion.div 
            className="lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl md:rounded-3xl lg:rounded-[3rem] flex flex-col items-center shadow-xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700/50">
              <div className="flex flex-row gap-3 text-sm md:text-lg font-medium">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    videoMode === "translation"
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setVideoMode("translation")}
                >
                  <HiLanguage className="text-xl" />
                  AI Dubbed
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    videoMode === "original"
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setVideoMode("original")}
                >
                  <BsPlayCircle className="text-xl" />
                  Original
                </button>
              </div>
              <div className="text-sm text-gray-400">German → English</div>
            </div>
            
            <div className="p-4 md:p-8 pt-4 w-full relative group">
              {videoMode === "translation" ? (
                <motion.div
                  key="translation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <video
                    ref={(ref) => ref && (ref.onclick = () => handleVideoClick(ref))}
                    src="https://firebasestorage.googleapis.com/v0/b/sqribe-app.appspot.com/o/dubbed%2F1711656677758.mp4?alt=media&token=985109e5-63fc-4258-9398-3eb65442c725"
                    className="w-full rounded-xl md:rounded-2xl cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPlaying ? (
                      <BsPauseCircle className="text-white text-6xl drop-shadow-lg" />
                    ) : (
                      <BsPlayCircle className="text-white text-6xl drop-shadow-lg" />
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="original"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <video
                    ref={(ref) => ref && (ref.onclick = () => handleVideoClick(ref))}
                    src="https://firebasestorage.googleapis.com/v0/b/sqribe-app.appspot.com/o/uploads%2FGermany's%20new%20censorship%20law%20explained%20in%2030%20seconds.mp4?alt=media&token=a4916335-a2e9-427c-9f9b-cffeed41ca86"
                    className="w-full rounded-xl md:rounded-2xl cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPlaying ? (
                      <BsPauseCircle className="text-white text-6xl drop-shadow-lg" />
                    ) : (
                      <BsPlayCircle className="text-white text-6xl drop-shadow-lg" />
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl md:rounded-3xl lg:rounded-[3rem] flex flex-col items-center shadow-xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-700/50">
              <div className="flex flex-row gap-3 text-sm md:text-lg font-medium">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white">
                  <MdPlayCircle className="text-xl" />
                  Clips Beta
                </div>
              </div>
              <div className="text-sm text-gray-400">Coming Soon</div>
            </div>
            
            <div className="p-4 md:p-8 pt-4 w-full">
              <div className="relative">
                <Image
                  src="/drakedont.png"
                  width={1000}
                  height={1000}
                  alt="Drake Don't"
                  className="rounded-xl md:rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl md:rounded-2xl flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-lg font-semibold mb-2">AI Video Clips</h3>
                    <p className="text-sm text-gray-300">Create viral short-form content with AI dubbing</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center space-x-8 px-4"
        >
          <div className="flex items-center space-x-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-400">Live Translation</span>
            </div>
            <div className="h-6 w-px bg-gray-700" />
            <div className="text-white font-semibold">
              1000+ projects completed this week
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoPreview;
