import { Inter } from 'next/font/google'
import Navbar from '@/components/Marketing/Navbar'
import Hero from '@/components/Marketing/Hero'
import CallToAction from '@/components/Marketing/CallToAction'
import Newsletter from '@/components/Marketing/Newsletter'
import Features from '@/components/Marketing/Features'
import LifetimeDeal from '@/components/Marketing/LifetimeDeal'
import Footer from '@/components/Marketing/Footer'
import Testimonial from '@/components/Marketing/Testimonial'
import Features2 from '@/components/Marketing/Features2'
import VideoPreview from '@/components/Marketing/VideoPreview'
import TranslationPreview from '@/components/Marketing/TranslationPreview'
import ClipsPreview from '@/components/Marketing/ClipsPreview'
import MoreFeatures from '@/components/Marketing/MoreFeatures'
import ReviewsSlider from '@/components/Marketing/ReviewsSlider'
import ScrollingCompanies from '@/components/Marketing/ScrollingCompanies'
import Scrollbar from "smooth-scrollbar";
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() => {
    console.log("CustomScrollbar component mounted");
  
    let scrollbar;
  
    try {
      scrollbar = Scrollbar.init(document.querySelector('#home'), {
        damping: 0.06, // Set damping to 0.05
      });
      console.log("Smooth scrollbar initialized:", scrollbar);
    } catch (error) {
      console.error("Error initializing smooth scrollbar:", error);
    }
  
    return () => {
      console.log("Destroying smooth scrollbar");
      if (scrollbar) {
        scrollbar.destroy();
      }
    };
  }, []);

  return (
    <main className="h-screen overflow-auto" id='home'>
      <Navbar />
      <Hero />
      <VideoPreview />
      <ScrollingCompanies />
      <TranslationPreview />
      <ClipsPreview />
      <MoreFeatures />
      <ReviewsSlider />
      <CallToAction />
      <Features />
      <Features2 />
      <Testimonial />
      {/* <LifetimeDeal /> */}
      <Newsletter />
      <Footer />
    </main>
  )
}
