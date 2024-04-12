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

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen" id='home'>
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
