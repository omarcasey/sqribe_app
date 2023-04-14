import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CallToAction from '@/components/CallToAction'
import FAQ from '@/components/FAQ'
import Newsletter from '@/components/Newsletter'
import Features from '@/components/Features'
import LifetimeDeal from '@/components/LifetimeDeal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      {/* <CallToAction /> */}
      {/* <FAQ /> */}
      <Features />
      <LifetimeDeal />
      <Newsletter />
    </main>
  )
}
