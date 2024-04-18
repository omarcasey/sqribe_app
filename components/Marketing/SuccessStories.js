import React, { useEffect, useRef } from "react";
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";
// import styles bundle
import "swiper/css/bundle";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SuccessStories = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(".swiper-containerr", {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 30,
      loop: false,
      speed: 1000,
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
      title:
        "Global VR Success: A 22% Visit Increase & 40% Returning Users with Rask AI’s Japanese Localization",
      content:
        "Discover how VR World achieved a 22% increase in visits and 40% returning users by leveraging Rask AI’s Japanese localization to overcome language barriers and foster a stronger, global VR community.",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title:
        "Psychology training center redubs entire course library with Rask AI",
      content:
        "UpPro School transforms its course library with Rask AI, maintaining originality in Ukrainian through VoiceClone technology, ensuring engagement and trust.",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Deputy Director",
      category: "Entertainment",
      badgeColor: "bg-purple-200 text-purple-800",
    },
    {
      title: "Satellites, voice cloning, and strategy, Oh My!",
      content:
        "Rask AI handles 90 to 95% of SkyFi’s translation needs, providing accurate and efficient multilingual translations.",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Board Member, Enterprise",
      category: "Content Creators",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title: "Rask AI Opens Doors to a Wildlife Fantasy Film",
      content:
        "Film producers worldwide find a solution in Rask AI for international distribution challenges, making global film sharing a reality. Image Images leads as innovators with ‘The Legend of Akam’, pioneering AI in film localization for authentic and efficient dubbing.",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Board Member, Enterprise",
      category: "Content Creators",
      badgeColor: "bg-orange-200 text-orange-800",
    },
    {
      title: "Gaming Bloggers Go Global with Rask AI",
      content:
        "Gaming bloggers and YouTube streamers go global with Rask AI, achieving professional voiceovers and broadened audience reach.",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title: "UI learning platform wins a new audience with Rask AI",
      content:
        "Learn how Rask AI boosts enterprise: swift, accurate localizations transform UI education. Automation fosters focus, enriching learning experiences.",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title:
        "30x More Views on YouTube: A Canadian Catholic Association Expands Outreach with Rask AI",
      content:
        "A Catholic association decided to experiment with our services for French YouTube Shorts. This strategic choice led to an astonishing 30x surge in viewership, significantly amplifying an outreach.",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title: "Rask Al will transform inclusive video learning",
      content:
        "See how Alex Isaacs nailed remote teaching with Rask AI's translation tools — watch his amazing success story in our video!",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title: "Rask AI Transformed our Video Marketing Process",
      content:
        "Check out the 4Endurance story. With Rask AI's translation and dubbing, handling global content became a breeze. Get the scoop in our case study",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title: "Rask AI helped a TV company break the viewership ceiling",
      content:
        "Dive into the journey of Fameplay TV’s, a Czech internet television specializing in edutainment. Chief Producer Lukáš Záhoř highlights Rask AI’s unmatched quality and cost-effective approach to global content adaptation",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
    {
      title:
        "I use Rask AI to share my knowledge about 3D-animation to everyone",
      content:
        "Salman Naseem, a telecom engineer, freelance animator, and educational content creator, discusses using Rask to launch a YouTube channel globally",
      contentURL: "/drakedont.png",
      author: "Steven R.",
      occupation: "Senior Software Engineer",
      category: "Entertainment",
      badgeColor: "bg-green-200 text-green-800",
    },
  ];

  return (
    <section className="pt-32 py-12 sm:pb-16 lg:pb-20 xl:pb-24 overflow-x-hidden">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl text-foreground mb-12 font-medium tracking-tight">
            Inspiring <span className="italic font-playfair">success </span>
            &nbsp;stories
          </h1>
          <div className="flex flex-row gap-1">
            <Button
              variant="flat"
              onPress={handlePrev}
              className="min-w-0 rounded-full px-3"
            >
              <FaArrowLeft size={18} className="w-5 h-5" />
            </Button>
            <Button
              variant="flat"
              onPress={handleNext}
              className="min-w-0 rounded-full px-3"
            >
              <FaArrowRight size={18} className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="swiper-containerr text-foreground">
          <div className="swiper-wrapper">
            {reviews.map((review, index) => (
              <div key={index} className="swiper-slide">
                <div className="review-card border border-foreground-300 rounded-3xl p-8 flex flex-col justify-between h-[700px]">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-medium mb-4">
                      {review.title}
                    </h3>
                    <p className="text-foreground-500 text-sm font-medium">
                      {review.content}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <Image
                      src={review.contentURL}
                      width={1000}
                      height={1000}
                      alt=""
                      className="my-12 rounded-3xl"
                    />
                  <div className="flex justify-between items-end">
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
                    <div
                      className={`px-2 py-1 ${review.badgeColor} tracking-tighter font-semibold text-sm flex items-center justify-center rounded-full mb-1`}
                    >
                      {review.category}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="swiper-button-next">next</div>
          <div className="swiper-button-prev">prev</div> */}
        </div>
        <div className="flex flex-row gap-4 w-full items-center justify-center mt-20">
            <Button size="lg" variant="bordered" color="primary" className="text-blue-300 text-xl py-7 rounded-2xl w-52 font-medium">Read Stories</Button>
            <Button size="lg" color="primary" className=" text-xl py-7 rounded-2xl w-52">Try it free</Button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
