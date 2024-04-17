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
      scrollbar = Scrollbar.init(document.querySelector('#my-scrollbar'), {
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
                Transcribe YouTube Video
              </h1>
              <p className="text-xl mb-12 text-foreground">
                Fast and accurate transcription and translation of YouTube
                videos using AI in over 130 languages. Supports videos up to 5
                hours long.
              </p>
              <Button
                size="lg"
                color="primary"
                className="text-xl font-semibold py-8"
              >
                Transcribe Youtube Video
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
                  Upload your full-length video
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
                  Edit and Export Transcription
                </h2>
                <p className="text-foreground-500 text-sm">
                  Once you&apos;re satisfied with the adjustments, simply save
                  the changes
                </p>
              </div>
            </div>
            <div className="col-span-3 border border-foreground-300 rounded-3xl p-8">
              <p className="text-foreground-500 text-xl">
                Within the service, you may request to show transcript and edit
                its parts as you want. If automatic transcription goes wrong,
                feel free to fix it. Meanwhile, we offer the highest possible
                accuracy rate, so you can save time on a text-based transcript.
                And, of course, feel free to translate your subs or generate
                automatic translation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-5xl text-center mb-10 leading-[1.1] text-foreground">
            Why do you need to{" "}
            <span className="italic font-playfair">
              Transcribe
              <br /> YouTube Videos
            </span>
            ?
          </h1>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Reach More People
                </h2>
                <p className="text-foreground-500 text-sm">
                  That&rsquo;s the sad truth for any vlogger – people open a
                  YouTube video with no sound. Transcribe YouTube video to make
                  sure your audience understands it. Voilà, the number of
                  viewers is rising.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Edit YouTube Video Subs
                </h2>
                <p className="text-foreground-500 text-sm">
                  AI is not perfect, and it is understandable. In our service,
                  you can transcribe videos automatically and then change the
                  text on your own. Leave only the necessary parts and fix
                  typos.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Transcribe Audio of any Quality
                </h2>
                <p className="text-foreground-500 text-sm">
                  Audio quality can influence how AI is interpreting it. Our
                  tool works with audio of any quality and volume to ensure
                  smooth use. And once again, feel free to edit text if
                  necessary.
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
              Options for Using Our Service for YouTube Video Transcripts
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
                  Make Your YouTube Blogging Accessible
                </h2>
                <p className="text-foreground-500 text-sm">
                  Not everybody has time to watch a YouTube video with sounds.
                  Add YouTube transcripts, and the viewer can watch it from
                  work, school, or public transport.
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
                  Boost Business Via YouTube
                </h2>
                <p className="text-foreground-500 text-sm">
                  YouTube videos are a new television. Promote your services,
                  make a YouTube video about your brand, or even host a
                  corporate channel. One successful YouTube video can replace a
                  marketing campaign. And to attract more people, make sure to
                  add a YouTube transcript.
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
                  Educate and Share Materials
                </h2>
                <p className="text-foreground-500 text-sm">
                  Books are outdated. Make sure to use a YouTube video to
                  promote educational materials. Then, transcribe YouTube videos
                  to ensure your students can read the information. By uploading
                  your study materials on YouTube, you make the educational
                  process much easier.
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
              Why Do You Need a YouTube Video Transcript: Some Unexpected
              Features
            </h1>
            <p className="text-xl mb-16 text-foreground">
              Yes, you can access more people via transcription tools. But there
              are some more perks of turning your speech into text.
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
                    Optimization Through Search Engines
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    Google checks all the Internet materials, searching for
                    keywords and useful information in real-time. And here is
                    the good news – it has access to YouTube as well. The text
                    used for your subtitles serves as indexation material. You
                    will appear in Google and other search engines. Create subs
                    even if they seem unessential. Accurate text with an
                    optimized length and accuracy will boost computer
                    optimization.
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
                    Boost Your Podcasts View Rate
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    Language learners often use podcasts and other YouTube
                    videos to study languages. Use automatic transcription as
                    your secret weapon. Even automatic transcription can help
                    learners to understand your voice better. Use real-time
                    transcription and help viewers from different countries and
                    regions understand you.
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
                    Make Educational Materials Easier
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    If you are a teacher, paste your YouTube video URL into
                    educational materials. Be sure that students love videos.
                    And especially tutorials that are easy to read and remember.
                    Using your URL, you can also convert YouTube video to text
                    and use it as a note for students. A &quot;win-win&quot;
                    situation – you film a talking video, and students receive
                    valuable notes.
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
                    Repurpose Your Videos
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    Take note that when using a link to your video or subs, you
                    can generate accurate texts for your blog posts, social
                    media texts, scripts, and so on.
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
                    Explore Inclusivity
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    Speech transcript can also serve as an analog of sign
                    language. Link subs to your speed, and people with hearing
                    impairments will be able to perceive them. First, you do a
                    good thing. Secondly, it enhances your brand&apos;s status
                    and accessibility.
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
                  <h2 className="text-foreground text-2xl mb-4">Add Style</h2>
                  <p className="text-foreground-500 text-sm">
                    Finally, have fun adding a transcript to your video and
                    making it stylish. Within our tool, you can generate titles
                    with different fonts and create your personal style. Create
                    subtitles and paste them only to the necessary parts of your
                    video. Feel free to add subtitles to your speech right in
                    the editor. Alternatively, download your transcripts and
                    paste them into YouTube editor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-blue-700 saturate-200 rounded-3xl h-44 flex justify-between items-center px-20">
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
