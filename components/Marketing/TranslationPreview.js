import { Button } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdTranslate, MdLanguage } from "react-icons/md";
import { HiGlobeAlt } from "react-icons/hi2";
import { useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
];

const TranslationPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState("Marketing");
  const [hoveredLanguage, setHoveredLanguage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center w-full mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-center max-w-4xl leading-tight">
            Maximize your impact by{" "}
            <span className="relative">
              <span className="relative z-10 italic font-serif bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                localizing
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 15 Q 75 0 150 15 Q 225 30 300 15" stroke="url(#gradient1)" strokeWidth="3" fill="none"/>
                <defs>
                  <linearGradient id="gradient1">
                    <stop offset="0%" stopColor="#8B5CF6"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            and{" "}
            <span className="relative">
              <span className="relative z-10 italic font-serif bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
                repurposing
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 15 Q 75 0 150 15 Q 225 30 300 15" stroke="url(#gradient2)" strokeWidth="3" fill="none"/>
                <defs>
                  <linearGradient id="gradient2">
                    <stop offset="0%" stopColor="#06B6D4"/>
                    <stop offset="100%" stopColor="#3B82F6"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            your content globally
          </h2>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <HiGlobeAlt className="text-2xl text-cyan-500" />
                  <span className="text-gray-300 font-medium">AI Translation Studio</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-400">Live Preview</span>
                </div>
              </div>

              <div className="relative group">
                <Image
                  src="/talking.jpg"
                  width={1000}
                  height={1000}
                  alt="Content Creator Speaking"
                  className="rounded-xl shadow-lg transform transition-transform group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium">Original Audio</p>
                    <p className="text-xs text-gray-300">Click to preview</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex space-x-4">
                  {["Marketing", "Educational", "Entertainment", "Creative"].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              <motion.div 
                className="space-y-6"
                variants={itemVariants}
              >
                <h3 className="text-3xl font-bold leading-tight">
                  Transform your content into{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
                    130+ languages
                  </span>
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  Expand your global reach and create new revenue streams with AI-powered
                  localization for your marketing, educational, and entertainment content.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {languages.slice(0, 6).map((lang) => (
                    <motion.div
                      key={lang.code}
                      className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800/50 cursor-pointer hover:bg-gray-700/50 transition-colors"
                      onHoverStart={() => setHoveredLanguage(lang.code)}
                      onHoverEnd={() => setHoveredLanguage(null)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm text-gray-300">{lang.name}</span>
                      {hoveredLanguage === lang.code && (
                        <motion.div
                          className="absolute bg-gray-900 text-white text-xs px-2 py-1 rounded"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Click to preview
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <Button 
                  color="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                >
                  <MdTranslate size={20} className="mr-2" />
                  Start Translating Now
                </Button>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Voice Cloning
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Lip Sync
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Auto Captions
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TranslationPreview;
