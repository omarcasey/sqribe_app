import { NextUIProvider } from '@nextui-org/react'
import '@/styles/globals.css'
import { Montserrat, Playfair_Display } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${montserrat.variable} ${playfair.variable} dark font-mont`}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </main>
  )
}
