import React, { useEffect, useRef } from "react";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { HiSparkles, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { Button } from "@nextui-org/react";

const reviews = [
  {
    title: "Game-Changing AI Translation",
    content: "The voice cloning technology is incredible. Our educational content now reaches students worldwide with perfect translations that maintain my original tone and style.",
    author: "Dr. Sarah Chen",
    occupation: "Educational Content Creator",
    category: "Education",
    rating: 5,
    avatar: "/avatars/sarah.jpg",
    gradient: "from-cyan-500 to-blue-500",
    stats: { views: "2.5M+", countries: "45+" }
  },
  {
    title: "Perfect for Global Marketing",
    content: "We've seen a 300% increase in international engagement since using Sqribe. The AI dubbing quality is indistinguishable from native speakers, and the process is incredibly fast.",
    author: "Marcus Rodriguez",
    occupation: "Marketing Director",
    category: "Marketing",
    rating: 5,
    avatar: "/avatars/marcus.jpg",
    gradient: "from-purple-500 to-pink-500",
    stats: { roi: "300%", reach: "12M+" }
  },
  {
    title: "Revolutionary Content Creation",
    content: "As a YouTuber, reaching global audiences was always a challenge. Sqribe's AI translation and dubbing have helped me grow my subscriber base across multiple languages effortlessly.",
    author: "Emma Thompson",
    occupation: "Content Creator",
    category: "Entertainment",
    rating: 5,
    avatar: "/avatars/emma.jpg",
    gradient: "from-amber-500 to-red-500",
    stats: { subscribers: "850K+", languages: "8" }
  },
  {
    title: "Enterprise-Grade Solution",
    content: "We've integrated Sqribe into our global content strategy. The accuracy and speed of translations, combined with natural-sounding voice cloning, have transformed our international presence.",
    author: "James Wilson",
    occupation: "Head of Content",
    category: "Enterprise",
    rating: 5,
    avatar: "/avatars/james.jpg",
    gradient: "from-green-500 to-emerald-500",
    stats: { efficiency: "+200%", savings: "40%" }
  }
];

const ReviewsSlider = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-container", {
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
        1024: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
      },
    });

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
            Customer Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by Content Creators{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Worldwide
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 15 Q 75 0 150 15 Q 225 30 300 15" stroke="url(#gradient)" strokeWidth="3" fill="none" />
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how creators and businesses are transforming their content
            with our AI-powered translation and dubbing platform
          </p>
        </motion.div>

        <div className="relative">
          <motion.div variants={itemVariants} className="swiper-container">
            <div className="swiper-wrapper">
              {reviews.map((review, index) => (
                <div key={index} className="swiper-slide">
                  <motion.div
                    className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Hover Effect Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-6">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="w-5 h-5 text-yellow-500" />
                        ))}
                      </div>

                      {/* Content */}
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${review.gradient} text-transparent bg-clip-text`}>
                        {review.title}
                      </h3>
                      <p className="text-gray-400 mb-6 flex-grow">
                        &quot;{review.content}&quot;
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {Object.entries(review.stats).map(([key, value]) => (
                          <div key={key} className="bg-gray-800/50 rounded-lg p-3">
                            <div className={`text-xl font-bold bg-gradient-to-r ${review.gradient} text-transparent bg-clip-text`}>
                              {value}
                            </div>
                            <div className="text-sm text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Author */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-12 h-12">
                            <Image
                              src="/png avatar.png"
                              alt={review.author}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                            />
                            <div className="absolute inset-0 rounded-full ring-2 ring-white/20" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">{review.author}</div>
                            <div className="text-sm text-gray-400">{review.occupation}</div>
                          </div>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${review.gradient} bg-opacity-10 text-white`}>
                          {review.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <HiArrowLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <HiArrowRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ReviewsSlider;
