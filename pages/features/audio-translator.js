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
                Audio Translator
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
                Start Translating Your Audio
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
              Translate Audio: How to Make a Text Out of Your Audio Files
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Upload the video file or an audio.
                </h2>
                <p className="text-foreground-500 text-sm">
                  The tool supports various file formats, so don&apos;t worry
                  about that. Whether you record with a professional mic or use
                  your old smartphone, the service has got you covered.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Select Languages
                </h2>
                <p className="text-foreground-500 text-sm">
                  Select the original language and the final language into which
                  the translation is required and press Translate button.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Wait for your auto-translate transcripts.
                </h2>
                <p className="text-foreground-500 text-sm">
                  Just a few minutes for generating subtitles, and your content
                  is ready. Just track the progress bar and wait a little. Rask
                  allows you to download TXT or SRP files to add subtitles
                  manually. Alternatively, add auto subtitles with the help of
                  our video editor and export your video with or without CC
                  captions.
                </p>
              </div>
            </div>
            <div className="col-span-3 border border-foreground-300 rounded-3xl p-8">
              <p className="text-foreground-500 text-xl">
                Just imagine that. You sit in your chair and sip a coffee, while
                AI does several consequent jobs: audio track (yes, it can
                automatically detect your voice), then audio to text, then
                producing a text file for all the spoken languages. With the
                speech recognition software, this all is possible in a few
                moments.
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
              <span className="italic font-playfair">
                Audio and Voice Translator
              </span>{" "}
              Tool?
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-6 mb-12">
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Translate audio automatically
                </h2>
                <p className="text-foreground-500 text-sm">
                  First of all, it saves time. Secondly, you don&apos;t spend on
                  a real-life translator. Current AI tools can translate audio
                  files based on the chosen language. Choose the tool, upload
                  your audio, and see Rask AI turning it into translated audio.
                  Whether you need a voiceover or subs for your audio files –
                  both are possible.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Reach a wider audience
                </h2>
                <p className="text-foreground-500 text-sm">
                  Use language as your superpower. Upload a video or an audio
                  file and make it available to people all over the world. With
                  130+ languages in a base, it is now possible. No more Google
                  Translate and language barriers. Make translations natural,
                  and translate audio files as if you were a native speaker.
                </p>
              </div>
            </div>
            <div className="border border-foreground-300 w-full rounded-3xl h-96">
              <div className="flex flex-col p-8">
                <h2 className="text-foreground text-2xl mb-2">
                  Make the Best Out of Poor Voice Recordings
                </h2>
                <p className="text-foreground-500 text-sm">
                  Within Sqribe, you can translate even poor audio clips with
                  noise and bad quality. AI needs just a few minutes to
                  understand and process your talking. Don&apos;t be afraid of a
                  low-quality microphone and translate to a desired language
                  easily.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <Button size="lg" color="primary" className=" text-2xl py-8">
              Start Translating Your Audio
            </Button>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <p className="text-5xl text-center tracking-tighter mb-16">
            Watch the video tutorial
          </p>
          <video
            src="https://firebasestorage.googleapis.com/v0/b/sqribe-app.appspot.com/o/dubbed%2F1711656677758.mp4?alt=media&token=985109e5-63fc-4258-9398-3eb65442c725"
            controls
            className={`w-full rounded-3xl`}
          />
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl text-center mb-10 tracking-tight max-w-3xl text-foreground">
              Options for Using Our Audio and Voice Translator AI Tool
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
                <h2 className="text-foreground text-2xl mb-4">Blogging</h2>
                <p className="text-foreground-500 text-sm">
                  YouTube is famous for its world audience, so make the best out
                  of it. Upload your voice or audio recording to the service and
                  select an audio translator. The audio translator can add subs
                  to your podcasts, or even imitate your voice recording style
                  to create a natural voiceover.
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
                <h2 className="text-foreground text-2xl mb-4">Businesses</h2>
                <p className="text-foreground-500 text-sm">
                  Make your international business meetings available to
                  everyone. Transcribe and translate audio or your speech.
                  Record corporate videos and instructions once and translate
                  audio into several languages, including Spanish and 130 more.
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
                  Do you work with international students? Overcome confusion
                  using the audio translator. Record educational podcasts and
                  lectures, and then just upload them to an audio translator.
                  You can receive up to 130 versions of your audio file in
                  different languages. Make subtitles to help your students.
                  That&apos;s not only about education. Build connections and
                  make people feel confident while studying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-foreground-50">
        <ReviewsSlider />
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-start justify-start max-w-4xl">
            <h1 className="text-5xl mb-10 tracking-tight text-foreground">
              Choosing an Audio Translator: What Factors to Consider
            </h1>
            <p className="text-xl mb-16 text-foreground">
              What makes a good editor? Apart from a perfect result, there are
              some things to see in advance. Explore which factors contribute to
              good transcription and translation software.
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
                    Sound effects and editing
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    See if you can edit the final voiceover or the original
                    audio. It means noise reduction, echo, and other basic
                    functions to make your sound better. You don&apos;t want to
                    do it in another program, right?
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
                    Language Catalog
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    See how many languages are available in the program. Cater
                    to tools with multiple languages and dialects – you never
                    know people from which region will be your target audience.
                    Sure, almost all tools offer English, Spanish, or German.
                    But what about Suomi, Polish, Korean, and other rare
                    markets? Make sure the audio-to-text tool can support a lot
                    of them.
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
                    Check Speed Limits
                  </h2>
                  <p className="text-foreground-500 text-sm">
                    A blogger will hardly need it, but what if you are a
                    marketer or a content manager? What if you need to translate
                    your audio and video content within several materials at
                    once? You may need to prepare ads or educational materials
                    for several target markets, and the software should suit.
                    Make sure it can instantly translate your video, or at least
                    the transcription process won&apos;t take long.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-24 sm:pb-16 lg:pb-20 xl:pb-24 border-b border-foreground-200 bg-foreground-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-5xl mb-5 tracking-tight text-foreground max-w-4xl">
            Audio File Voiceover Is Now Possible: See How
          </h1>
          <p className="text-foreground-700 text-xl mb-12 max-w-4xl">
            You understood it correctly. Just imagine hearing your own voice
            speaking several foreign languages. With the help of AI editing and
            translating, you can generate an artificial voice that sounds like
            yours. AI will take data about your speech tendencies and pitch, and
            create a voice imitation. For that, transcribe and translate audio,
            and then simply create a voiceover. Treat it as a transcription
            analogy that allows foreign users to hear you, not only read subs.
          </p>
          <p className="text-foreground text-2xl mb-3">Download Options</p>
          <p className="text-foreground-700 text-xl max-w-4xl mb-12">
            All in all, text transcription offers a huge range of options – just
            know how to use them and where to get high-quality transcripts.
          </p>
          <p className="text-foreground text-2xl mb-3">
            Ensuring Smooth Audio Translation: Keep These Rules
          </p>
          <p className="text-foreground-700 text-xl max-w-4xl mb-12">
            Transcription and translating really go above and beyond, but
            everything has limits. You surely want your subtitles and videos to
            be correct, so you don&apos;t need additional editing. It also depends on
            you. First, make sure your videos and audio are recorded in good
            weather conditions. Don&apos;t let such things as rain and storms disturb
            AI from your voice. Also, make sure the program can translate your
            audio with no noise or additional sounds.
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
