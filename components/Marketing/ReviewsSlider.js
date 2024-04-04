import React, { useEffect } from "react";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const ReviewsSlider = () => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 30,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // Clean up Swiper instance on unmount
    return () => {
      swiper.destroy();
    };
  }, []);

  const reviews = [
    {
      title: "Translating and adding voices to videos has never been easier",
      content:
        "The platform is very user friendly. It makes my work much easier and it saves me a lot of time.",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Marketing",
    },
    {
      title: "2 Highly recommended",
      content:
        "This is the best product I've ever used. It exceeded my expectations.",
      author: "Jane Smith",
    },
    {
      title: "3 Highly recommended",
      content:
        "This is the best product I've ever used. It exceeded my expectations.",
      author: "Jane Smith",
    },
    {
      title: "4 Highly recommended",
      content:
        "This is the best product I've ever used. It exceeded my expectations.",
      author: "Jane Smith",
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
    <section className="py-12 sm:pb-16 lg:pb-20 xl:pb-24 overflow-x-hidden">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <h1 className="text-4xl text-foreground mb-12 font-medium tracking-tight">
          Amazing Reviews
        </h1>
        <div className="swiper-container text-foreground">
          <div className="swiper-wrapper">
            {reviews.map((review, index) => (
              <div key={index} className="swiper-slide">
                <div className="review-card border border-foreground-300 rounded-3xl p-8 flex flex-col h-96 justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-row mb-8 gap-2">
                      <FaStar className="w-5 h-5" />
                      <FaStar className="w-5 h-5" />
                      <FaStar className="w-5 h-5" />
                      <FaStar className="w-5 h-5" />
                      <FaStar className="w-5 h-5" />
                    </div>

                    <h3 className="text-2xl font-medium mb-4">
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
                        className="w-14 h-14 rounded-full"
                        alt=""
                      />
                      <div className="flex flex-col ml-4">
                        <p className="font-bold">{review.author}</p>
                        <p className="text-foreground-500 text-sm">
                          {review.occupation}
                        </p>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-red-200 text-red-800 tracking-tighter font-semibold text-sm flex items-center justify-center rounded-full mb-1">
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
