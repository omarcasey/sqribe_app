import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { MdTranslate, MdRecordVoiceOver, MdClosedCaption } from "react-icons/md";
import { HiSparkles, HiSpeakerWave } from "react-icons/hi2";
import { RiTranslate, RiVoiceprintFill } from "react-icons/ri";
import { BsLightningCharge } from "react-icons/bs";
import Link from "next/link";

const features = [
  {
    title: "VoiceClone™",
    description: "Communicate with your audience in your own voice across 30+ languages",
    icon: <RiVoiceprintFill className="w-8 h-8" />,
    gradient: "from-purple-500 to-pink-500",
    demo: "voiceclone-demo.mp4"
  },
  {
    title: "Multi-Speaker Detection",
    description: "Automatically detect and clone multiple speakers in your videos with perfect accuracy",
    icon: <HiSpeakerWave className="w-8 h-8" />,
    gradient: "from-cyan-500 to-blue-500",
    demo: "multispeaker-demo.mp4"
  },
  {
    title: "AI Lip-Sync",
    description: "Advanced lip synchronization technology for perfectly matched audio and video",
    icon: <MdRecordVoiceOver className="w-8 h-8" />,
    gradient: "from-rose-500 to-orange-500",
    demo: "lipsync-demo.mp4"
  },
  {
    title: "Smart Captions",
    description: "Auto-generated, perfectly timed captions in multiple languages",
    icon: <MdClosedCaption className="w-8 h-8" />,
    gradient: "from-green-500 to-emerald-500",
    demo: "captions-demo.mp4"
  },
  {
    title: "Natural Accents",
    description: "Region-specific accents and intonations for authentic localization",
    icon: <RiTranslate className="w-8 h-8" />,
    gradient: "from-amber-500 to-yellow-500",
    demo: "accents-demo.mp4"
  },
  {
    title: "Neural Text-to-Speech",
    description: "Transform text into natural human voices with emotion and emphasis",
    icon: <BsLightningCharge className="w-8 h-8" />,
    gradient: "from-indigo-500 to-purple-500",
    demo: "tts-demo.mp4"
  }
];

const MoreFeatures = () => {
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
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-[100px]" />
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
            Powered by Advanced AI
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need for{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Global Content
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
            Our suite of AI-powered tools helps you create professional, localized content
            that resonates with audiences worldwide
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 overflow-hidden"
            >
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 mb-4`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Watch Demo
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <Link
            href="/signup"
            className="relative inline-flex group"
          >
            <div className="absolute transition-all duration-200 rounded-full -inset-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:opacity-100 group-hover:blur-md opacity-70"></div>
            <span className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gray-900 rounded-full">
              Start Creating for Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </Link>

          <p className="text-sm text-gray-400">No credit card required • 14-day free trial</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MoreFeatures;
