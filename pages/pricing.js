import { Inter } from 'next/font/google'
import Navbar from '@/components/Marketing/Navbar'
import Hero from '@/components/Marketing/Hero'
import CallToAction from '@/components/Marketing/CallToAction'
import Newsletter from '@/components/Marketing/Newsletter'
import Features from '@/components/Marketing/Features'
import LifetimeDeal from '@/components/Marketing/LifetimeDeal'
import Footer from '@/components/Marketing/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Pricing() {
  return (
    <main className="min-h-screen bg-[#0e1015] font-mont">
      <Navbar />
      {/* <Hero />
      <CallToAction />
      <Features /> */}
      <LifetimeDeal />
      <Newsletter />
      <Footer />
    </main>
  )
}
