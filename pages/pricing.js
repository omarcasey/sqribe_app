import { Inter } from "next/font/google";
import Navbar from "@/components/Marketing/Navbar";
import Hero from "@/components/Marketing/Hero";
import CallToAction from "@/components/Marketing/CallToAction";
import Newsletter from "@/components/Marketing/Newsletter";
import Features from "@/components/Marketing/Features";
import LifetimeDeal from "@/components/Marketing/LifetimeDeal";
import Footer from "@/components/Marketing/Footer";
import PricingOptions from "@/components/Marketing/PricingOptions";
import ScrollingCompanies from "@/components/Marketing/ScrollingCompanies";
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function Pricing() {
  useEffect(() => {
    console.log("CustomScrollbar component mounted");

    let scrollbar;

    try {
      scrollbar = Scrollbar.init(document.querySelector("#pricing"), {
        damping: 0.06, // Set damping to 0.05
      });
      console.log("Smooth scrollbar initialized:", scrollbar);
    } catch (error) {
      console.error("Error initializing smooth scrollbar:", error);
    }

    return () => {
      console.log("Destroying smooth scrollbar");
      if (scrollbar) {
        scrollbar.destroy();
      }
    };
  }, []);

  return (
    <main className="min-h-screen" id="pricing">
      <Navbar />
      <PricingOptions />
      <ScrollingCompanies />
      <section className="pt-12 pb-24 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-7xl text-foreground text-center mb-10">F.A.Q.</h1>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl">
              <Accordion selectionMode="multiple" className="">
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title={<p className="py-3">What does one minute mean?</p>}
                  className=""
                >
                  <p className="text-foreground-500">
                    1 minute is a universal credit you can spend on Translation
                    or Shorts.
                    <br />
                    <br />
                    Translation: 1 minute equals 1 minute of final translated
                    video/audio. For example, if you have a 5-minute video that
                    needs to be translated into 2 new languages, you will need
                    10 minutes.
                    <br />
                    <br />
                    Shorts: 1 minute equals 1 generated short. To generate 5
                    shorts, you will need 5 minutes.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Accordion 2"
                  title={
                    <p className="py-3">How many languages do you support?</p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="4"
                  aria-label="Accordion 4"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="5"
                  aria-label="Accordion 5"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="6"
                  aria-label="Accordion 6"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="7"
                  aria-label="Accordion 7"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="8"
                  aria-label="Accordion 8"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="9"
                  aria-label="Accordion 9"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="10"
                  aria-label="Accordion 10"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
                <AccordionItem
                  key="11"
                  aria-label="Accordion 11"
                  title={
                    <p className="py-3">
                      How do I choose the right pricing plan?
                    </p>
                  }
                >
                  <p className="text-foreground-500">
                    With Sqribe, you can translate from nearly any language to
                    over 130 languages. Our Voice Cloning feature offers a
                    human-like experience and is currently available when
                    dubbing from any source language to the following 29
                    languages: English, Japanese, Chinese, German, Hindi,
                    French, Korean, Portuguese, Italian, Spanish, Indonesian,
                    Dutch, Turkish, Filipino, Polish, Ukrainian, Swedish,
                    Bulgarian, Romanian, Arabic, Czech, Greek, Finnish,
                    Croatian, Malay, Slovak, Danish, Tamil, Russian.
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 saturate-200 rounded-3xl h-44 flex justify-between items-center px-20">
            <p className="text-3xl tracking-tight">
              Start translating videos now
            </p>
            <Button
              size="lg"
              className="bg-white py-8 w-60 text-blue-700 text-xl font-semibold"
            >
              Try it free
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
