import { AssemblyAI } from "assemblyai";

function splitIntoParagraphs(transcriptObjects, maxSentencesPerParagraph = 5) {
  const paragraphs = [];
  let currentParagraph = [];
  let sentenceCount = 0;
  let currentSpeaker = null;
  let paragraphStartTime = null;
  let paragraphEndTime = null;

  // Iterate through each transcript object
  for (let i = 0; i < transcriptObjects.length; i++) {
    const { text, speaker, start, end } = transcriptObjects[i];

    // Set the start time for the first paragraph
    if (paragraphStartTime === null) {
      paragraphStartTime = start;
    }

    // Detect speaker change
    if (currentSpeaker !== null && speaker !== currentSpeaker) {
      if (currentParagraph.length > 0) {
        paragraphs.push({
          text: currentParagraph.join(" "),
          speaker: currentSpeaker,
          startTime: paragraphStartTime,
          endTime: paragraphEndTime,
        });
        currentParagraph = [];
        sentenceCount = 0;
        paragraphStartTime = start; // Update paragraph start time
      }
    }

    // Add text to current paragraph
    currentParagraph.push(text);

    // If the word ends with a period, question mark, or exclamation mark,
    // treat it as the end of a sentence and count it
    if (text.match(/[.?!]$/)) {
      sentenceCount++;
    }

    // Start a new paragraph if sentence count exceeds the threshold
    if (sentenceCount >= maxSentencesPerParagraph) {
      paragraphs.push({
        text: currentParagraph.join(" "),
        speaker: currentSpeaker,
        startTime: paragraphStartTime,
        endTime: paragraphEndTime,
      });
      currentParagraph = [];
      sentenceCount = 0;
      paragraphStartTime = start; // Update paragraph start time
    }

    // Update paragraph end time
    paragraphEndTime = end;

    currentSpeaker = speaker;
  }

  // Add the last paragraph
  if (currentParagraph.length > 0) {
    paragraphs.push({
      text: currentParagraph.join(" "),
      speaker: currentSpeaker,
      startTime: paragraphStartTime,
      endTime: paragraphEndTime,
    });
  }

  return paragraphs;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { audioPath, audioLanguage, numOfSpeakers } = req.body;

  if (!audioPath) {
    return res.status(400).json({ error: "Missing 'audioPath' parameter" });
  }

  try {
    const client = new AssemblyAI({
      apiKey: "4cdf7675ca834590a29cfdab160be8e6",
    });

    const params = {
      audio: `https://storage.googleapis.com/sqribe-app.appspot.com/${audioPath}`,
      speaker_labels: true,
      summarization: true,
      summary_model: numOfSpeakers == 2 ? "conversational" : "informative",
      summary_type: "bullets",
    };

    if (audioLanguage === "ru" || audioLanguage === "es" || audioLanguage === "de") {
      params.summarization = false;
    }

    if (numOfSpeakers !== "autodetect") {
      params.speakers_expected = parseInt(numOfSpeakers);
    }

    if (audioLanguage === "autodetect") {
      params.language_detection = true;
    } else {
      params.language_code = audioLanguage;
    }

    console.log(params);

    const transcript = await client.transcripts.transcribe(params);
    // const { sentences } = await client.transcripts.sentences(transcript.id);
    // for (const sentence of sentences) {
    //   console.log(sentence.text);
    // }

    // const { paragraphs } = await client.transcripts.paragraphs(transcript.id);
    // console.log(paragraphs)

    const segments = splitIntoParagraphs(transcript.words);

    res.status(200).json({ segments: segments, assembly: transcript });
  } catch (error) {
    console.error("Error converting speech to text:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
