import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiSparkles, HiArrowUpRight } from 'react-icons/hi2';

const features = [
  {
    icon: '/voice.png',
    title: 'Instant Dubbing',
    description: 'AI-powered voice cloning in 30+ languages',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: '/trending.png',
    title: 'Scalable & Affordable',
    description: 'Pay only for what you use, scale as you grow',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: '/speed.png',
    title: 'Quick Turnaround',
    description: '10x faster than traditional dubbing',
    gradient: 'from-amber-500 to-red-500'
  }
];

const CallToAction = () => {
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
            Start Creating Today
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Content for a{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Global Audience
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
            Join thousands of content creators who are reaching millions of viewers
            worldwide with AI-powered video translation
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6"
            >
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 mr-4`}>
                    <Image
                      src={feature.icon}
                      width={32}
                      height={32}
                      alt=""
                      className="filter -hue-rotate-30"
                    />
                  </div>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 max-w-3xl mx-auto">
            There's <span className="font-playfair italic">no need</span> for translation
            agencies or other products anymore
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-300 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors"
            >
              Watch Demo
              <HiArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/signup"
              className="relative inline-flex group"
            >
              <div className="absolute transition-all duration-200 rounded-full -inset-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:opacity-100 group-hover:blur-md opacity-70"></div>
              <span className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gray-900 rounded-full">
                Start Creating for Free
                <HiArrowUpRight className="ml-2 w-5 h-5" />
              </span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required • 14-day free trial</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
