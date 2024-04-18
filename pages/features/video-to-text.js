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
            <div className="w-1/2 pr-12">
              <h1 className="text-7xl font-semibold mb-8 tracking-tight text-foreground">
                Transcribe Video to Text
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
                Transcribe Video
              </Button>
            </div>
            <div className="w-1/2">
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
          <h1 className="text-4xl text-center mb-10 text-foreground">
            How does it work?
          </h1>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Upload Your Video
                </h2>
                <p className="text-foreground-500 text-sm">
                  Upload your video or provide a Youtube link
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Press Translate Button
                </h2>
                <p className="text-foreground-500 text-sm">
                  Select the desired language and press translate
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Download Your Transcribed Video
                </h2>
                <p className="text-foreground-500 text-sm">
                  After the transcription process is over, just download your
                  text. Enjoy accurate transcription and reach a wider audience
                  – it&apos;s that easy!
                </p>
              </div>
            </div>
            <div className="col-span-3 border border-foreground-300 rounded-3xl p-8">
              <p className="text-foreground-500 text-xl">
                No matter what your record, your video content needs subtitles –
                text video is much more efficient than just a voiceover. Not
                sure? Try transcribing video in Sqribe and see the results.
                It&apos;s easier than you think.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl text-center mb-10 tracking-tight max-w-2xl text-foreground leading-[1.1]">
              Why Do You Need This AI{" "}
              <span className="italic font-playfair">Video to Text</span> Tool?
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Convert Video into an International Product
                </h2>
                <p className="text-foreground-500 text-sm">
                  Whether you work in a small business or a large corporation,
                  transcribe video to text to make it available all over the
                  world. Transcribe YouTube videos, ads, or social media content
                  in a few clicks. And our artificial intelligence will adapt
                  subtitles to various platforms and cultures.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Transcribe Video to text with Adaptivity
                </h2>
                <p className="text-foreground-500 text-sm">
                  No AI is perfect, and we accept it. When you transcribe video
                  to text automatically, some mistakes can appear. Also,
                  don&apos;t forget about cultural features – sometimes, you
                  know better what your video transcription needs. Feel free to
                  edit your video to text after AI does its job. Adapt words and
                  headings, or even delete unnecessary parts.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Embrace Quick Turnaround
                </h2>
                <p className="text-foreground-500 text-sm">
                  No more waiting. Sqribe can transcribe video to text in a few
                  moments. Choose the video-to-text tool and enjoy the perfect
                  performance. No matter what your video file formats or size
                  are, the app will process your video content and transcribe
                  video to text as quickly as possible. Just download ready-made
                  captions.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button size="lg" color="primary" className=" w-56 text-2xl py-8">
              Try it free
            </Button>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl text-center mb-10 tracking-tight max-w-3xl text-foreground">
              Options for Using Our Video to Text Service
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
                <h2 className="text-foreground text-2xl mb-4">Businesses</h2>
                <p className="text-foreground-500 text-sm">
                  Convert video into text in different languages, and you will
                  reach an international audience. Or do you only work in a
                  local market? No worries. The video-to-text option will boost
                  engagement and viewing time. Allow your customers to watch
                  your videos even when they are on a run and save time for you
                  and them.
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
                  Boost Your Blog
                </h2>
                <p className="text-foreground-500 text-sm">
                  Make your YouTube video easier to watch and remember with
                  video transcription. It&apos;s easy – upload video files, opt
                  for the video-to-text option, and get automatic subs of the
                  best quality. And that&apos;s not all. For accurate video
                  transcriptions, open the subs editor and make changes if
                  needed. For blog content, leave only the necessary subtitles –
                  captions and headings, and delete other details. Video to text
                  converter is not only about accuracy. That&apos;s all about
                  engagement with your audience and perfect free video delivery.
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
                  Educational Institutions
                </h2>
                <p className="text-foreground-500 text-sm">
                  Transform your speech into a written text and help students
                  learn more efficiently. Annotate your video content by adding
                  subtitles or transcribing the video. With the help of it, your
                  students can make notes, understand foreign languages, and
                  even copy/paste your subtitles to make more efficient notes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReviewsSlider />
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-start justify-start max-w-4xl">
            <h1 className="text-5xl mb-10 tracking-tight text-foreground">
              Make Videos For a Worldwide Audience: Pros of Multilingual Content
            </h1>
            <p className="text-xl mb-16 text-foreground">
              Even if you created your account for local access, reaching a
              worldwide audience can be surprisingly profitable. Don&apos;t
              believe it? Just try to convert video to text once and see how
              your view rate rises. And that&apos;s not all. See the full suite
              of advantages you receive with a video-to-text tool.
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
                  <h2 className="text-foreground text-2xl mb-4">
                    Enhance Your Videos With a Universal Script
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    Convert video to text, and you get text files to use
                    everywhere and for all possible goals. Use your audio to
                    text as notes, download subs and use them for SEO
                    optimization, or utilize captions as a video scenario. All
                    this is easier when you create a text transcript, available
                    on any screen and device.
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
                  <h2 className="text-foreground text-2xl mb-4">
                    Boost SEO Optimization
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    Video-to-text is not only about users. Subtitles are
                    accessible for search engines like Google, Bing, and others.
                    And since your captions are accessible, they are indexed. It
                    means that you can create keywords within your video-to-text
                    transcription and let SEO tools boost your video products in
                    search output.
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
                  <h2 className="text-foreground text-2xl mb-4">
                    Enhance Your Status
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    Simple captions can create a whole new status or a company,
                    can you believe that? By transcribing video to text, you
                    show your company&apos;s intention and access to the world
                    market. Also, such videos emphasize your inclusivity. Upload
                    your video-to-text content on different platforms and use a
                    foreign language. Also, video-to-text tools help people with
                    impairment or foreigners understand you and your language.
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
                  <h2 className="text-foreground text-2xl mb-4">Easy to Use</h2>
                  <p className="text-foreground-500 text-sm">
                    Create and edit your transcription, translate the
                    transcription language if necessary, and upload the
                    transcript to YouTube. With the help of AI, you can do it
                    all in a few clicks. Feel free to craft a transcript
                    automatically or customize it – you are free do to
                    everything you need within Sqribe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 border-b border-foreground-200">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-5xl mb-10 tracking-tight text-foreground">
            Add Subtitles to Your YouTube Video
          </h1>
          <p className="text-foreground-700 text-xl mb-6 max-w-4xl">
            But as you may guessed, we have another surprise. Do you want to
            insert your subs within a YouTube editor? Or, do you need some text
            convert options? Our tool allows you to do so. Select among the
            subtitle formats (including a plain TXT format, of course), and just
            download it. You can now add your text files to the YouTube subtitle
            editor and boost your video within search engines. Add your
            subtitles local file into Google Drive, a Word document, or any
            other text editor, and you get ready-made notes or a scenario.
          </p>
          <p className="text-foreground-800 text-xl max-w-4xl">
            All in all, text transcription offers a huge range of options – just
            know how to use them and where to get high-quality transcripts.
          </p>
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
