// pages/api/process-video.js

const { PubSub } = require("@google-cloud/pubsub");

// Your Google Cloud Speech-to-Text API credentials
const googleCredentials = JSON.parse(
  process.env.GOOGLE_CLOUD_KEY
);

// Create a Pub/Sub client
const pubSubClient = new PubSub({
  projectId: 'sqribe-app',
  credentials: googleCredentials
  });

// Handler function for the API route
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Extract parameters from the request body
  const { filePath, audioLanguageCode, numOfSpeakers, projectName, downloadURL, translationCode, docRefId } = req.body;

  // Check if required parameters are provided
  if (!filePath || !audioLanguageCode || !numOfSpeakers) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const topicName = "video-processing";
  const data = {
    filePath,
    audioLanguageCode,
    numOfSpeakers,
    projectName,
    downloadURL,
    translationCode,
    docRefId
  };

  try {
    // Convert data to Buffer
    const dataBuffer = Buffer.from(JSON.stringify(data));

    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published.`);
    return res.status(200).json({ message: "Video processing initiated" });
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
