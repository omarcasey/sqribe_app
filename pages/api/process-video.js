// pages/api/process-video.js
const { PubSub } = require("@google-cloud/pubsub");

// Your Google Cloud Speech-to-Text API credentials
let googleCredentials;
try {
  googleCredentials = JSON.parse(process.env.GOOGLE_CLOUD_KEY);
} catch (error) {
  console.error("Error parsing Google Cloud credentials:", error);
  // Provide fallback or throw a more informative error
}

// Create a Pub/Sub client
let pubSubClient;
try {
  pubSubClient = new PubSub({
    projectId: 'sqribe-app',
    credentials: googleCredentials
  });
} catch (error) {
  console.error("Error creating PubSub client:", error);
}

// Handler function for the API route
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Log the request for debugging
  console.log("Received process-video request:", req.body);

  // Check if PubSub client is initialized
  if (!pubSubClient) {
    console.error("PubSub client is not initialized");
    return res.status(500).json({ error: "PubSub client initialization error" });
  }

  // Check if request body exists
  if (!req.body) {
    return res.status(400).json({ error: "Request body is empty" });
  }

  // Extract parameters from the request body
  const { filePath, audioLanguageCode, numOfSpeakers, projectName, downloadURL, translationCode, docRefId, youtubeUrl } = req.body;

  // Log extracted parameters
  console.log("Extracted parameters:", {
    filePath,
    audioLanguageCode,
    numOfSpeakers,
    projectName,
    downloadURL: downloadURL ? "present" : "missing",
    translationCode,
    docRefId,
    youtubeUrl: youtubeUrl ? "present" : "missing"
  });

  // Check if required parameters are provided
  if (!audioLanguageCode || !numOfSpeakers) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Check if either downloadURL or youtubeUrl is provided
  if (!downloadURL && !youtubeUrl) {
    return res.status(400).json({ error: "Either downloadURL or youtubeUrl is required" });
  }

  const topicName = "video-processing";
  const data = {
    filePath,
    audioLanguageCode,
    numOfSpeakers,
    projectName,
    downloadURL,
    translationCode,
    docRefId,
    youtubeUrl
  };

  try {
    // Convert data to Buffer
    const dataBuffer = Buffer.from(JSON.stringify(data));

    console.log(`Publishing message to topic: ${topicName}`);
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });
      
    console.log(`Message ${messageId} published successfully.`);
    return res.status(200).json({ 
      message: "Video processing initiated",
      messageId 
    });
  } catch (error) {
    console.error(`Error publishing to PubSub:`, error);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      details: error.message 
    });
  }
}