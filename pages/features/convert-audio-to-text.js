import Navbar from "@/components/Marketing/Navbar";
import Footer from "@/components/Marketing/Footer";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import ReviewsSlider from "@/components/Marketing/ReviewsSlider";
import { useEffect } from "react";
import Scrollbar from "smooth-scrollbar";

export default function Home() {
  useEffect(() => {
    console.log("CustomScrollbar component mounted");

    let scrollbar;

    try {
      scrollbar = Scrollbar.init(document.querySelector("#my-scrollbar"), {
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
    <main className="h-screen overflow-auto font-mont" id="my-scrollbar">
      <Navbar />
      <section className="pt-24 pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-row">
            <div className="w-1/2 pr-6">
              <h1 className="text-7xl font-semibold mb-8 tracking-tight text-foreground">
                Audio to Text
              </h1>
              <p className="text-xl mb-12 text-foreground">
                Fast and accurate transcription and translation of videos using
                AI in over 130 languages. Supports videos up to 5 hours long.
              </p>
              <Button
                size="lg"
                color="primary"
                className="text-xl font-semibold py-8 bg-blue-700 saturate-200"
              >
                Convert Audio To Text For Free
              </Button>
            </div>
            <div className="w-1/2 pl-6">
              <Image
                src="/talking.jpg"
                alt=""
                width={1000}
                height={1000}
                className="rounded-3xl border border-foreground-500"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl text-center mb-16 text-foreground max-w-4xl tracking-tight">
              Transcribe Audio In a Few Clicks
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Upload your Audio or Video Content
                </h2>
                <p className="text-foreground-500 text-sm">
                  First, make sure your audio meets a file limit and other
                  nuances. Machine learning is of the highest quality at Rask,
                  yet it may need some help understanding multiple languages and
                  different formats.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Edit Your Text Transcribe Audio
                </h2>
                <p className="text-foreground-500 text-sm">
                  Text, automatically made by machines, can have some mistakes.
                  But even in a free version, you are free to edit it. Open the
                  audio transcriber editor and change some text parts. You can
                  fix mistakes, add notes, and do everything possible with a
                  file.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Download Your Text Convert Audio
                </h2>
                <p className="text-foreground-500 text-sm">
                  After you convert audio to text, you have several options. In
                  the text converter, you can take the subtitle file and
                  download it directly. Upload your TXT file in Google Docs or
                  Add to any video or a podcast.
                </p>
              </div>
            </div>
            <div className="col-span-3 border border-foreground-300 rounded-3xl p-8">
              <p className="text-foreground-500 text-xl">
                Within Sqribe, you can also use multiple languages – 130, to be
                precise. For this, wait for audio-to-text, and then convert
                audio to the needed language. The machine will translate your
                subtitles as quickly as possible. It is a perfect opportunity to
                reach the world audience or to craft amazing educational
                materials.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl text-center mb-10 tracking-tight max-w-3xl text-foreground leading-[1.1]">
              Why Do You Need This AI{" "}
              <span className="italic font-playfair">Audio to Text&nbsp;</span>{" "}
              Tool?
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Convert Audio to Text Immediately
                </h2>
                <p className="text-foreground-500 text-sm">
                  No need for manual transcription anymore. Transcribe audio to
                  text by simply uploading your audio recording to our service.
                  AI will analyze the audio file, search for words and phrases,
                  and craft automatic transcription.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Customize Your Titles
                </h2>
                <p className="text-foreground-500 text-sm">
                  In some cases, you need your audio or video files to be fully
                  annotated. But in some cases, you only need some headings or
                  key phrases within an audio file. In this case, open our
                  editor and edit your subtitles after the transcription tool.
                  Delete what you don&apos;t need or add something new.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Use Files Separately
                </h2>
                <p className="text-foreground-500 text-sm">
                  Audio-to-text doesn&apos;t necessarily mean a ready-made video
                  with subtitles and a sound. Use a text converter and download
                  your text online. Add subtitles to Google Drive, upload them
                  to YouTube - do anything, in fact. Our transcription software
                  only does its job. Then, you are free to do anything you need.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button size="lg" color="primary" className="w-56 text-2xl py-8">
              Try it free
            </Button>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl text-center mb-10 tracking-tight max-w-3xl text-foreground">
              Options for Using our Audio to Text Service
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl">
              <div className="flex flex-col p-8">
                <Image
                  src="/talking.jpg"
                  width={500}
                  height={500}
                  alt=""
                  className="rounded-3xl h-44 mb-8"
                />
                <h2 className="text-foreground text-2xl mb-4">
                  Make Your Podcasts Easier
                </h2>
                <p className="text-foreground-500 text-sm">
                  You may record amazing podcasts with top audio quality and
                  other perks. But who needs it if a viewer simply doesn&apos;t
                  have time? Make sure you transcribe audio or video file, so
                  the audience can read all the necessary details. Even with
                  free transcription, you can boost your audience&apos;s
                  attention and enhance the view rate.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl">
              <div className="flex flex-col p-8">
                <Image
                  src="/drakedont.png"
                  width={500}
                  height={500}
                  alt=""
                  className="rounded-3xl h-44 mb-8"
                />
                <h2 className="text-foreground text-2xl mb-4">
                  Make Ads Better
                </h2>
                <p className="text-foreground-500 text-sm">
                  Text files are necessary if you want your ads to be effective.
                  No matter what file formats you use. Whether these are
                  Instagram Reels, YouTube previews, or other ad types - convert
                  audio to text. Automatic transcription software can make it
                  within several seconds, and your business will get dozens of
                  new clients. People cannot listen to audio formats all the
                  time. Thus, make sure they can READ them.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl">
              <div className="flex flex-col p-8">
                <Image
                  src="/talking.jpg"
                  width={500}
                  height={500}
                  alt=""
                  className="rounded-3xl h-44 mb-8"
                />
                <h2 className="text-foreground text-2xl mb-4">
                  Boost Language Learning Materials
                </h2>
                <p className="text-foreground-500 text-sm">
                  Language learning requires various tools, including
                  audio-to-text. Do you upload your audio file online? Or do you
                  send some educational podcasts to students? Doesn&apos;t
                  matter. Converting audio to text is always a thing. Your
                  students can read audio parts they cannot understand, or make
                  notes. Convert audio to text for reading tasks, use the text
                  converter to make lectures readable, or transcribe audio to
                  ensure understanding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReviewsSlider />
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-start justify-start max-w-5xl">
            <h1 className="text-5xl mb-10 tracking-tight text-foreground">
              Best Practices: What Advanced Features to Try or Your Audio or
              Video Files
            </h1>
            <p className="text-xl mb-16 text-foreground">
              Do you want to be a pro at our transcription service? There is a
              transcribe feature and special functions to turn your written text
              and convert your voice to the next level.
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl">
              <div className="flex flex-col">
                <Image
                  src="/talking.jpg"
                  width={500}
                  height={500}
                  alt=""
                  className="rounded-t-3xl h-60 w-full"
                />
                <div className="p-6 flex flex-col">
                  {/* <h2 className="text-foreground text-2xl mb-4">
                    Sound effects and editing
                  </h2> */}
                  <p className="text-foreground-500 text-sm">
                    Let&apos;s assume you transcribe audio to text. What to do
                    next? First, it is advised to download your text file and
                    create captions manually. Do it on YouTube or other video
                    hosting sites, it doesn&apos;t matter. The feature is that
                    such text files will be used by search engines to find and
                    index your video. Use this SEO secret and use an
                    audio-to-text converter smartly.
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl">
              <div className="flex flex-col">
                <Image
                  src="/talking.jpg"
                  width={500}
                  height={500}
                  alt=""
                  className="rounded-t-3xl h-60 w-full"
                />
                <div className="p-6 flex flex-col">
                  {/* <h2 className="text-foreground text-2xl mb-4">
                    Language Catalog
                  </h2> */}
                  <p className="text-foreground-500 text-sm">
                    Also, convert audio to text and translate it into several
                    languages. You can even create online audio voiceover. Our
                    audio-to-text converter can also mimic your voice to create
                    a multilingual version of your speech.
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl">
              <div className="flex flex-col">
                <Image
                  src="/talking.jpg"
                  width={500}
                  height={500}
                  alt=""
                  className="rounded-t-3xl h-60 w-full"
                />
                <div className="p-6 flex flex-col">
                  {/* <h2 className="text-foreground text-2xl mb-4">
                    Make the Best Out of Audio Files
                  </h2> */}
                  <p className="text-foreground-500 text-sm">
                    With voice recognition in Rask, you can automatically
                    transcribe videos and audio. But how do you make sure that
                    free transcription will work out? Well, there are some tips
                    to make the best out of the subtitle generator.
                  </p>
                </div>
              </div>
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
