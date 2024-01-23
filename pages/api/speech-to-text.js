import { SpeechClient } from "@google-cloud/speech";
import { createClient } from "@deepgram/sdk";

// Your Google Cloud Speech-to-Text API credentials
const googleCredentials = JSON.parse(
  process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS
);

const deepgramCredentials = process.env.DEEPGRAM_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { audioPath, audioLanguage } = req.body;

  if (!audioPath) {
    return res.status(400).json({ error: "Missing 'audioPath' parameter" });
  }

  if (!audioLanguage) {
    return res.status(400).json({ error: "Missing 'audioLanguage' parameter" });
  }

  try {
    // // Initialize Google Cloud Speech-to-Text client
    // const speechClient = new SpeechClient({ credentials: googleCredentials });

    // // Configure the audio settings with GCS URI
    // const audio = {
    //   uri: `gs://sqribe-app.appspot.com/${audioPath}`, // Replace with your GCS URI
    // };

    // // Configure the audio settings
    // const config = {
    //   encoding: "MP3",
    //   sampleRateHertz: 16000,
    //   languageCode: audioLanguage,
    //   enableWordTimeOffsets: true, // Enable word-level timestamps
    // };

    // const request = {
    //   audio: audio,
    //   config: config,
    // };

    // // Perform the asynchronous speech-to-text conversion
    // const [operation] = await speechClient.longRunningRecognize(request);
    // const [transcriptionResponse] = await operation.promise();

    // // Extract the transcription with word-level timestamps from the response
    // const results = transcriptionResponse.results.map((result) => {
    //   const alternatives = result.alternatives[0];
    //   const wordsWithTimestamps = alternatives.words.map((word) => ({
    //     word: word.word,
    //     start_time:
    //       parseFloat(word.startTime.seconds) + word.startTime.nanos / 1e9,
    //     end_time: parseFloat(word.endTime.seconds) + word.endTime.nanos / 1e9,
    //   }));
    //   return {
    //     transcript: alternatives.transcript,
    //     words: wordsWithTimestamps,
    //   };
    // });

    // Transcribe an audio file from a URL:
    const deepgram = createClient(deepgramCredentials);

    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: `https://storage.googleapis.com/sqribe-app.appspot.com/${audioPath}`,
      },
      {
        smart_format: true,
        model: "nova-2",
      }
    );

    if (error) throw error;
    // if (!error) console.dir(result, { depth: null });

    // Respond with the transcribed text and timestamps
    // console.log("Transcription: ", JSON.stringify(result));
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error converting speech to text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
