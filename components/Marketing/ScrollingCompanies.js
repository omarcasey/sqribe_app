import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ScrollingCompanies = () => {
  // Example placeholder image URLs
  const companyImages = [
    "/meta.png",
    "/amazon.png",
    "/googlewide.png",
    // Add more placeholder images as needed
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 0,
    cssEase: "linear",
    rtl: true,
    responsive: [], // Make it non-responsive
  };

  return (
    <section className="pt-6 md:pt-12 pb-12 md:pb-24">
      <div className="md:px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative">
        <h1 className="text-center text-xl mb-8 text-foreground">
          Over 50,000 Happy Users
        </h1>
        <div className="relative">
          <div className="absolute z-10 top-0 bottom-0 -left-6 w-16 bg-default-100 dark:bg-black blur-md -my-7" />
          <div className="absolute z-10 top-0 bottom-0 -right-6 w-16 bg-default-100 dark:bg-black blur-md -my-7" />
          <Slider {...settings}>
            {companyImages.map((image, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-44 flex items-center px-4">
                  <Image
                    src={image}
                    width={1000}
                    height={1000}
                    alt=""
                    className="h-auto w-auto object-contain"
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center">
                <div className="h-44 flex items-center px-4">
                  <Image
                    src={'/nvidia-logo.png'}
                    width={1000}
                    height={1000}
                    alt=""
                    className="h-auto w-auto object-contain  filter invert hover:invert-0 transition duration-300 ease-in-out"
                  />
                </div>
              </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ScrollingCompanies;
