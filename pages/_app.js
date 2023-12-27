import { NextUIProvider } from "@nextui-org/react";
import "@/styles/globals.css";
import { Montserrat, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/authContext";
import { Provider } from "react-redux";
import store from "@/store";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <AuthProvider>
          <main
            className={`${montserrat.variable} ${playfair.variable} font-mont`}
          >
            <Component {...pageProps} />
            {/* <SpeedInsights /> */}
          </main>
        </AuthProvider>
      </Provider>
    </NextUIProvider>
  );
}
