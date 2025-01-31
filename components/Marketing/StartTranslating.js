import { motion } from "framer-motion";
import Link from "next/link";
import { HiSparkles, HiArrowUpRight, HiGlobeAlt, HiPlay } from "react-icons/hi2";

const StartTranslating = () => {
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
      transition: { duration: 0.5 }
    }
  };

  const stats = [
    { value: "30+", label: "Languages" },
    { value: "10x", label: "Faster" },
    { value: "99%", label: "Accuracy" },
    { value: "24/7", label: "Support" }
  ];

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
        <motion.div 
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px'
            }}/>
          </div>

          <div className="relative z-10 px-6 py-16 sm:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="text-center lg:text-left">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
                  <HiSparkles className="mr-2" />
                  AI-Powered Translation
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Start Translating Your Videos{" "}
                  <span className="relative">
                    Today
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 0 15 Q 75 0 150 15 Q 225 30 300 15" stroke="white" strokeOpacity="0.3" strokeWidth="3" fill="none"/>
                    </svg>
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Join thousands of content creators who are reaching global audiences
                  with our AI-powered video translation platform
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-purple-600 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Start Free Trial
                    <HiArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white border-2 border-white/20 rounded-full hover:bg-white/10 transition-colors"
                  >
                    Watch Demo
                    <HiPlay className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center lg:text-left">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl transform rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl transform -rotate-3" />
                <div className="relative bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-8">
                  <div className="flex items-center justify-center space-x-4 mb-8">
                    <HiGlobeAlt className="w-12 h-12 text-white" />
                    <div className="text-2xl font-bold text-white">Global Reach</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-white/10"
                        style={{
                          animation: `pulse 2s infinite ${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
};

export default StartTranslating;
