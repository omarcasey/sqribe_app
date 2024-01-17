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

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen bg-default-100 dark:bg-black font-mont" id='home'>
      <Navbar />
      <Hero />
      <CallToAction />
      <Features />
      <Features2 />
      <Testimonial />
      <LifetimeDeal />
      <Newsletter />
      <Footer />
    </main>
  )
}
