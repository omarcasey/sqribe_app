// Import the necessary dependencies
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Define the API endpoint
export default async function handler(req, res) {
  try {
    // Get the transcript string from the request body
    const { transcript } = req.body;

    // Make a request to the OpenAI API to summarize the transcript using ChatGPT
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. You are going to receive transcripts of audio files or video files and summarize them for users to read. The summary should be shorter than the transcript.",
        },
        { role: "user", content: "Summarize this:\n" + transcript },
      ],
    });

    // Extract the summary from the OpenAI API response
    const summary = completion.choices[0].message.content;

    // Return the summary as the API response
    console.log("Summary: " + summary)
    res.status(200).json({ summary });
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while summarizing the transcript." });
  }
}
