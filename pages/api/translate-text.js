// Imports the Google Cloud client library
import * as deepl from 'deepl-node';

const deeplCredentials = process.env.DEEPL_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { inputText, target } = req.body;

  const modifiedTarget = target === "en" ? "en-US" : target;

  if (!inputText) {
    return res.status(400).json({ error: "Missing 'inputText' parameter" });
  }

  if (!target) {
    return res.status(400).json({ error: "Missing 'target' parameter" });
  }

  try {

    const translator = new deepl.Translator(deeplCredentials);

    async function translateTextAsync() {
      try {        
        const result = await translator.translateText(inputText, null, modifiedTarget);
        console.log(result.text); // Bonjour, le monde !
        res.status(200).json({ result: result.text }); // Add a comma after 'result.text'
      } catch (error) {
        console.error("Error translating:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }

    await translateTextAsync();
    
  } catch (error) {
    console.error("Error translating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
