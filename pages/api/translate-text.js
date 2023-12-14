// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Your Google Cloud Speech-to-Text API credentials
const googleCredentials = JSON.parse(
  process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { inputText, target } = req.body;

  if (!inputText) {
    return res.status(400).json({ error: "Missing 'inputText' parameter" });
  }

  if (!target) {
    return res.status(400).json({ error: "Missing 'target' parameter" });
  }

  try {
    // Creates a client
    const translate = new Translate({ credentials: googleCredentials });

    async function translateText() {
      // Translates the text into the target language. "text" can be a string for
      // translating a single piece of text, or an array of strings for translating
      // multiple texts.
      let [translations] = await translate.translate(inputText, target);
      translations = Array.isArray(translations)
        ? translations
        : [translations];
      console.log("Translations:");
      translations.forEach((translation, i) => {
        console.log(`${inputText[i]} => (${target}) ${translation}`);
      });

      //send back translation
      console.log("Translation OBJECT: ", JSON.stringify(translations));
      res.status(200).json({ translations });
    }

    await translateText();

  } catch (error) {
    console.error("Error translating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
