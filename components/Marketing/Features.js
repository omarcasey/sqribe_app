import Image from "next/image";
import { motion } from "framer-motion";
import { HiSparkles, HiGlobeAlt, HiMicrophone } from "react-icons/hi2";
import { MdClosedCaption } from "react-icons/md";

const features = [
  {
    title: "Captions & Subtitles",
    subtitle: "Professional Accessibility",
    description: "AI-powered caption generation with perfect timing and formatting. Support for all major video platforms and formats.",
    icon: <MdClosedCaption className="w-8 h-8" />,
    gradient: "from-cyan-500 to-blue-500",
    image: "/captions-preview.jpg",
    stats: [
      { value: "99.9%", label: "Accuracy" },
      { value: "40+", label: "Languages" },
      { value: "Real-time", label: "Generation" }
    ]
  },
  {
    title: "Translation & Dubbing",
    subtitle: "Global Reach",
    description: "Professional-grade translation and dubbing services that preserve the original tone and emotion of your content.",
    icon: <HiGlobeAlt className="w-8 h-8" />,
    gradient: "from-purple-500 to-pink-500",
    image: "/translation-preview.jpg",
    stats: [
      { value: "130+", label: "Languages" },
      { value: "Native", label: "Accents" },
      { value: "24/7", label: "Processing" }
    ]
  },
  {
    title: "Voice Overs",
    subtitle: "Natural Sound",
    description: "AI voice cloning technology that creates natural-sounding voiceovers while maintaining your unique style.",
    icon: <HiMicrophone className="w-8 h-8" />,
    gradient: "from-amber-500 to-red-500",
    image: "/voiceover-preview.jpg",
    stats: [
      { value: "1000+", label: "Voices" },
      { value: "100%", label: "Natural" },
      { value: "Instant", label: "Creation" }
    ]
  }
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
            Core Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Tools for{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
                Content Creators
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 15 Q 75 0 150 15 Q 225 30 300 15" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#06B6D4"/>
                    <stop offset="100%" stopColor="#3B82F6"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to create professional, multilingual content that engages
            audiences worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 pb-0">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 mb-4`}>
                  {feature.icon}
                </div>
                <p className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text uppercase tracking-wider mb-2`}>
                  {feature.subtitle}
                </p>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Feature Image */}
              <div className="relative h-48 mt-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10" />
                <Image
                  src="/drakedont.png"
                  alt={feature.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-0 inset-x-0 z-20 p-6">
                  <div className="flex justify-between items-center">
                    {feature.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Gradient Line */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Features