import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CallToAction from '@/components/CallToAction'
import Newsletter from '@/components/Newsletter'
import Features from '@/components/Features'
import LifetimeDeal from '@/components/LifetimeDeal'
import Footer from '@/components/Footer'
import Testimonial from '@/components/Testimonial'
import Features2 from '@/components/Features2'

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
