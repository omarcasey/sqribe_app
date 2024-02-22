import fetch from 'node-fetch';
import FormData from 'form-data';

const apiKey = "9b139b9c3761bd2453c432ce92ca4498"; // Your ElevenLabs API key

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, fileURL } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing 'name' parameter" });
  }

  if (!fileURL) {
    return res.status(400).json({ error: "Missing 'fileURL' parameter" });
  }

  try {
    // Download the file from the URL
    const response = await fetch(fileURL);
    const fileData = await response.buffer();

    const form = new FormData();
    // Append the file data to the form data
    form.append("files", fileData, { filename: "voice-file" });
    form.append("name", name);

    const options = {
      method: "POST",
      headers: { "xi-api-key": apiKey },
      body: form
    };

    const responseFromAPI = await fetch("https://api.elevenlabs.io/v1/voices/add", options);
    const responseData = await responseFromAPI.json();
    console.log(responseData);

    res.status(200).json({ voiceId: responseData.voice_id });
  } catch (error) {
    console.error("Error adding voice to elevenlabs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
