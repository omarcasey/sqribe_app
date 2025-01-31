import { Button } from "@nextui-org/react";
import Image from "next/image";
import { MdTranslate } from "react-icons/md";
import { RiScissorsCutLine } from "react-icons/ri";
import { HiPlay, HiSparkles } from "react-icons/hi2";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    icon: "✨",
    title: "AI-Powered Highlights",
    description: "Automatically detect the most engaging moments"
  },
  {
    icon: "🎯",
    title: "Perfect Timing",
    description: "Optimal clip length for each platform"
  },
  {
    icon: "🔥",
    title: "Viral Potential",
    description: "AI analyzes engagement patterns"
  },
  {
    icon: "⚡",
    title: "Instant Creation",
    description: "Generate multiple clips in seconds"
  }
];

const ClipsPreview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-500 text-sm font-medium mb-6">
            <HiSparkles className="mr-2" />
            AI-Powered Clip Generation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Turn Long Videos into{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Viral Clips
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 15 Q 75 0 150 15 Q 225 30 300 15" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#8B5CF6"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let AI find the perfect moments in your videos and transform them into
            engaging social media content
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-300">Recording Clips</span>
                </div>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <video
                src="/viralshorts.mp4"
                className="w-full rounded-lg shadow-lg transform transition-transform hover:scale-[1.02]"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                      <HiPlay className="w-5 h-5 text-white" />
                    </button>
                    <div className="space-y-1">
                      <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                      </div>
                      <div className="text-xs text-gray-300">00:45 / 01:30</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300">1080p</span>
                    <span className="text-sm text-gray-300">•</span>
                    <span className="text-sm text-gray-300">60fps</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold leading-tight">
                Create Engaging Short-Form
                <br />
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Content in Seconds
                </span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Upload your long-form videos and let our AI automatically generate
                perfectly timed clips optimized for TikTok, Instagram Reels, and YouTube Shorts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-2xl mb-2 block">{feature.icon}</span>
                  <h4 className="font-semibold text-gray-200 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              <RiScissorsCutLine size={20} className="mr-2" />
              Start Creating Clips
            </Button>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                TikTok Ready
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Instagram Reels
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                YouTube Shorts
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClipsPreview;
