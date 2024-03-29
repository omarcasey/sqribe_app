import { Inter } from 'next/font/google'
import Navbar from '@/components/Marketing/Navbar'
import Hero from '@/components/Marketing/Hero'
import CallToAction from '@/components/Marketing/CallToAction'
import Newsletter from '@/components/Marketing/Newsletter'
import Features from '@/components/Marketing/Features'
import LifetimeDeal from '@/components/Marketing/LifetimeDeal'
import Footer from '@/components/Marketing/Footer'
import PricingOptions from '@/components/Marketing/PricingOptions'

const inter = Inter({ subsets: ['latin'] })

export default function Pricing() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PricingOptions/>
      <LifetimeDeal />
      <Newsletter />
      <Footer />
    </main>
  )
}
