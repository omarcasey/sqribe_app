import { Inter } from "next/font/google";
import Navbar from "@/components/Marketing/Navbar";
import Hero from "@/components/Marketing/Hero";
import CallToAction from "@/components/Marketing/CallToAction";
import Newsletter from "@/components/Marketing/Newsletter";
import Features from "@/components/Marketing/Features";
import LifetimeDeal from "@/components/Marketing/LifetimeDeal";
import Footer from "@/components/Marketing/Footer";
import Testimonial from "@/components/Marketing/Testimonial";
import Features2 from "@/components/Marketing/Features2";
import VideoPreview from "@/components/Marketing/VideoPreview";
import TranslationPreview from "@/components/Marketing/TranslationPreview";
import ClipsPreview from "@/components/Marketing/ClipsPreview";
import MoreFeatures from "@/components/Marketing/MoreFeatures";
import ReviewsSlider from "@/components/Marketing/ReviewsSlider";
import ScrollingCompanies from "@/components/Marketing/ScrollingCompanies";
import Scrollbar from "smooth-scrollbar";
import { useEffect } from "react";
import SuccessStories from "@/components/Marketing/SuccessStories";
import StartTranslating from "@/components/Marketing/StartTranslating";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    console.log("CustomScrollbar component mounted");

    let scrollbar;

    try {
      const homeNode = document.querySelector("#home");
      if (homeNode) {
        scrollbar = Scrollbar.init(homeNode, {
          damping: 0.06, // Set damping to 0.05
        });
        console.log("Smooth scrollbar initialized:", scrollbar);
      } else {
        console.error("Failed to find the '#home' node.");
      }
    } catch (error) {
      console.error("Error initializing smooth scrollbar:", error);
    }

    return () => {
      console.log("Destroying smooth scrollbar");
      try {
        if (scrollbar) {
          scrollbar.destroy();
        }
      } catch (error) {
        console.error("Error destroying smooth scrollbar:", error);
      }
    };
  }, []);

  return (
    <main className="h-screen relative flex flex-col">
      <Navbar />
      <div id="home" className="h-full overflow-y-auto w-screen overflow-x-hidden">
        <Hero />
        <VideoPreview />
        <ScrollingCompanies />
        <TranslationPreview />
        <ClipsPreview />
        <MoreFeatures />
        <Features />
        {/* <Features2 /> */}
        <ReviewsSlider />
        <SuccessStories />
        <CallToAction />
        <StartTranslating />
        <Footer />
      </div>
    </main>
  );
}
