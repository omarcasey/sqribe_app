import { uploadString, ref, getDownloadURL } from "firebase/storage";
import ElevenLabs from "elevenlabs-node";
import { storage } from "@/firebase";
import { Buffer } from "buffer";
const ffmpeg = require("ffmpeg-static"); // Install the ffmpeg-static package
import { exec } from "child_process";

const apiKey = "9b139b9c3761bd2453c432ce92ca4498"; // Your ElevenLabs API key

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text, fileURL, voiceId, stabilityValue, similarityValue, styleValue, speakerBoostValue } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' parameter" });
  }

  // if (!voiceId) {
  //   return res.status(400).json({ error: "Missing 'voiceId' parameter" });
  // }

  const voice = new ElevenLabs({
    apiKey: apiKey,
    voiceId: voiceId || "pNInz6obpgDQGcFmaJgB",
  });

  try {
    // Buffer the audio data
    const chunks = [];
    const response = await voice.textToSpeechStream({
      textInput: text,
      responseType: "stream",
      modelId: "eleven_multilingual_v2",
      stability: stabilityValue || 0.5,
      similarityBoost: similarityValue || 0.75,
      style: styleValue || 0,
      speakerBoost: speakerBoostValue,
    });

    response.on("data", (chunk) => chunks.push(chunk));
    response.on("end", async () => {
      const audioBuffer = Buffer.concat(chunks);

      // Upload the audio buffer to Firebase Storage
      const storageRef = ref(storage, `texttospeech/${Date.now()}_speech.mp3`);
      await uploadString(storageRef, audioBuffer.toString("base64"), "base64");

      // Get the download URL
      const audioURL = await getDownloadURL(storageRef);

      // Replace the original audio of fileURL with the new audio from audioUrl
      const mergeAudioWithVideo = async (fileURL, audioUrl, outputFilePath) => {
        try {
          // Run FFmpeg command to remove the original audio and merge the video with the new audio
          const command = `${ffmpeg} -i ${fileURL} -i ${audioUrl} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${outputFilePath}`;
          await exec(command);

          console.log("Audio merged successfully!");
        } catch (error) {
          console.error("Failed to merge audio with video:", error);
        }
      };

      const outputFilePath = "public/video_with_audio.mp4";
      mergeAudioWithVideo(fileURL, audioURL, outputFilePath);

      res.status(200).json({ audioUrl: audioURL });
    });
  } catch (error) {
    console.error("Error converting text to speech:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
