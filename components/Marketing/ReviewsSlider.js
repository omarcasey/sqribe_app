import React, { useEffect, useRef } from "react";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const ReviewsSlider = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-container", {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 30,
      loop: false,
      speed: 1000,
      breakpoints: {
        0: {
          slidesPerView: 1, // Show 1 slide for very small screens
        },
        768: {
          slidesPerView: 2, // Show 2 slides from 768px upwards
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

  const reviews = [
    {
      title: "Translating and adding voices to videos has never been easier",
      content:
        "The platform is very user friendly. It makes my work much easier and it saves me a lot of time.",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Marketing",
      badgeColor: "bg-red-200 text-red-800",
    },
    {
      title: "A great way to reach new audiences in other countries",
      content:
        "I have been using Sqribe for a few weeks now, and I am thoroughly impressed with its capabilities. What I like best about Sqribe is its intuitive interface which makes it incredibly user-friendly. The data processing speed is phenomenal, saving me a lot of time and effort. Moreover, the support team is responsive and very helpful, which adds to the overall positive experience of using Sqribe.",
      author: "Nadia S.",
      occupation: "Deputy Director",
      category: "Entertainment",
      badgeColor: "bg-purple-200 text-purple-800",
    },
    {
      title: "Probably the best Al dubbing software on the market right now",
      content:
        "It is very easy to download your voice or video files. It doesn't give you wrong error messages about non-existing watermarks in my own podcast, like other Al tools does (without any way of correcting the error). It has an easy to use interface where both the original language and the translation can be edited. And the clone voices are quite good, although there's still some work to be done. But in totality a top tool right now in the market.",
      author: "Bent D.",
      occupation: "Board Member, Enterprise",
      category: "Content Creators",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title: "4 Highly recommended",
      content:
        "This is the best product I've ever used. It exceeded my expectations.",
      author: "Jane Smith",
      occupation: "Board Member, Enterprise",
      category: "Content Creators",
      badgeColor: "bg-orange-200 text-orange-800",
    },
    {
      title: "5 Highly recommended",
      content:
        "This is the best product I've ever used. It exceeded my expectations.",
      author: "Jane Smith",
      occupation: "CEO",
    },
    // Add more review objects as needed
  ];

  return (
    <section className="pt-24 py-12 sm:pb-16 lg:pb-20 xl:pb-24 overflow-x-hidden">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-row justify-between items-end mb-6 md:mb-12">
          <h1 className="text-3xl md:text-4xl text-foreground font-medium tracking-tight">
          <span className="italic font-playfair">Amazing</span> <br/>Testimonials
          </h1>
          <div className="flex flex-row gap-1">
            <Button
              variant="flat"
              onPress={handlePrev}
              className="min-w-0 rounded-full px-3"
            >
              <FaArrowLeft size={18} className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <Button
              variant="flat"
              onPress={handleNext}
              className="min-w-0 rounded-full px-3"
            >
              <FaArrowRight size={18} className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
        <div className="swiper-container text-foreground">
          <div className="swiper-wrapper">
            {reviews.map((review, index) => (
              <div key={index} className="swiper-slide">
                <div className="review-card border border-foreground-300 rounded-3xl p-6 md:p-8 flex flex-col h-[502px] md:h-[430px] justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-row mb-6 md:mb-8 gap-2">
                      <FaStar className="w-4 h-4 md:w-5 md:h-5" />
                      <FaStar className="w-4 h-4 md:w-5 md:h-5" />
                      <FaStar className="w-4 h-4 md:w-5 md:h-5" />
                      <FaStar className="w-4 h-4 md:w-5 md:h-5" />
                      <FaStar className="w-4 h-4 md:w-5 md:h-5" />
                    </div>

                    <h3 className="text-xl tracking-tighter md:tracking-normal md:text-2xl font-medium mb-4">
                      {review.title}
                    </h3>
                    <p className="text-foreground-500 text-sm font-medium">
                      {review.content}
                    </p>
                  </div>
                  <div className="flex justify justify-between items-end">
                    <div className="flex items-center">
                      <Image
                        src="/png avatar.png"
                        width={500}
                        height={500}
                        className="w-11 h-11 md:w-14 md:h-14 rounded-full"
                        alt=""
                      />
                      <div className="flex flex-col ml-4">
                        <p className="font-bold text-sm md:text-base">{review.author}</p>
                        <p className="text-foreground-500 text-tiny md:text-sm">
                          {review.occupation}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 ${review.badgeColor} tracking-tighter font-semibold text-tiny md:text-sm flex items-center justify-center rounded-full mb-1 text-center`}
                    >
                      {review.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="swiper-button-next">next</div>
          <div className="swiper-button-prev">prev</div> */}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSlider;
