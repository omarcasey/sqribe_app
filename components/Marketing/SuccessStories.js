import React, { useEffect, useRef } from "react";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { HiSparkles, HiArrowLeft as HiArrowLeft2, HiArrowRight as HiArrowRight2, HiArrowUpRight } from "react-icons/hi2";
import Link from "next/link";

const SuccessStories = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-success", {
      slidesPerView: "auto",
      spaceBetween: 32,
      centeredSlides: false,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    });

    // Clean up Swiper instance on unmount
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
      }
    };
  }, []);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

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

  const successStories = [
    {
      title: "Global VR Success Story",
      subtitle: "VR World",
      content: "Achieved a 22% increase in visits and 40% returning users through Japanese localization, breaking language barriers in the VR community.",
      stats: {
        visits: "+22%",
        retention: "40%",
        languages: "5+"
      },
      image: "/case-studies/vr-world.jpg",
      gradient: "from-purple-500 to-pink-500",
      category: "Virtual Reality"
    },
    {
      title: "Educational Revolution",
      subtitle: "UpPro School",
      content: "Transformed entire psychology course library with AI voice cloning, maintaining authenticity in Ukrainian while expanding global reach.",
      stats: {
        courses: "200+",
        students: "50K+",
        satisfaction: "98%"
      },
      image: "/case-studies/uppro.jpg",
      gradient: "from-cyan-500 to-blue-500",
      category: "Education"
    },
    {
      title: "Gaming Goes Global",
      subtitle: "StreamerPro",
      content: "Gaming bloggers and YouTube streamers achieved international success with professional AI voiceovers in multiple languages.",
      stats: {
        views: "12M+",
        growth: "300%",
        regions: "25+"
      },
      image: "/case-studies/gaming.jpg",
      gradient: "from-amber-500 to-red-500",
      category: "Gaming"
    },
    {
      title: "Faith Without Borders",
      subtitle: "Catholic Association",
      content: "Achieved 30x surge in YouTube Shorts viewership through strategic multilingual content adaptation.",
      stats: {
        growth: "30x",
        reach: "15M+",
        engagement: "45%"
      },
      image: "/case-studies/faith.jpg",
      gradient: "from-emerald-500 to-green-500",
      category: "Non-Profit"
    }
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
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-500 text-sm font-medium mb-6">
            <HiSparkles className="mr-2" />
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See How Others Are{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Succeeding
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
            Discover how businesses and creators are using our AI technology
            to reach global audiences and achieve remarkable results
          </p>
        </motion.div>

        <div className="relative">
          <motion.div variants={itemVariants} className="swiper-success">
            <div className="swiper-wrapper">
              {successStories.map((story, index) => (
                <div key={index} className="swiper-slide">
                  <motion.div 
                    className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10" />
                      <Image
                        src={story.image}
                        alt={story.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${story.gradient} bg-opacity-10 text-white`}>
                          {story.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="mb-6">
                        <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${story.gradient} text-transparent bg-clip-text`}>
                          {story.title}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium mb-4">
                          {story.subtitle}
                        </p>
                        <p className="text-gray-300">
                          {story.content}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(story.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className={`text-xl font-bold bg-gradient-to-r ${story.gradient} text-transparent bg-clip-text`}>
                              {value}
                            </div>
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <Link
                        href={`/case-studies/${story.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Read full story
                        <HiArrowUpRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>

                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <HiArrowLeft2 className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <HiArrowRight2 className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 flex flex-col items-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-300 border border-gray-700 rounded-full hover:bg-gray-800 transition-colors"
            >
              View All Stories
              <HiArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/signup"
              className="relative inline-flex group"
            >
              <div className="absolute transition-all duration-200 rounded-full -inset-[2px] bg-gradient-to-r from-purple-500 to-pink-500 group-hover:opacity-100 group-hover:blur-md opacity-70"></div>
              <span className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gray-900 rounded-full">
                Start Your Success Story
                <HiArrowUpRight className="ml-2 w-5 h-5" />
              </span>
            </Link>
          </div>
          <p className="text-sm text-gray-400">Join thousands of successful creators and businesses</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SuccessStories;
