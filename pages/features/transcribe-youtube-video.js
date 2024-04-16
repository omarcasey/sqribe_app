import Navbar from "@/components/Marketing/Navbar";
import Newsletter from "@/components/Marketing/Newsletter";
import LifetimeDeal from "@/components/Marketing/LifetimeDeal";
import Footer from "@/components/Marketing/Footer";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0e1015] font-mont">
      <Navbar />
      <section className="pt-24 pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-row">
            <div className="w-1/2 pr-10">
              <h1 className="text-7xl font-semibold mb-8">
                Transcribe Video to Text
              </h1>
              <p className="text-xl mb-12">
                Fast and accurate transcription and translation of videos using
                AI in over 130 languages. Supports videos up to 5 hours long.
              </p>
              <Button
                size="lg"
                color="primary"
                className="text-xl font-semibold py-8"
              >
                Transcribe Video
              </Button>
            </div>
            <div className="w-1/2">
              <Image src="/talking.jpg" alt="" width={1000} height={1000} className="rounded-3xl border border-foreground-500" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
