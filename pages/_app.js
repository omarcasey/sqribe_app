import { NextUIProvider } from "@nextui-org/react";
import "@/styles/globals.css";
import { Montserrat, Playfair_Display } from "next/font/google";
import { AuthProvider } from "@/components/authContext";
import { ThemeProvider } from "@/components/ThemeContext";
import { Provider } from "react-redux";
import store from "@/store";

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
    <main className={`${montserrat.variable} ${playfair.variable} font-mont`}>
      <Provider store={store}>
        <NextUIProvider>
          <AuthProvider>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </AuthProvider>
        </NextUIProvider>
      </Provider>
    </main>
  );
}
