import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CallToAction from '@/components/CallToAction'
import Newsletter from '@/components/Newsletter'
import Features from '@/components/Features'
import LifetimeDeal from '@/components/LifetimeDeal'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <CallToAction />
      <Features />
      <LifetimeDeal />
      <Newsletter />
      <Footer />
    </main>
  )
}
