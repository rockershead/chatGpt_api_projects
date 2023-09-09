const OpenAI = require("openai");
require("dotenv").config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function generateSummarizePrompt(inputText) {
  return `Summarize this in 10 words:${inputText}`;
}

async function main() {
  const inputText =
    "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.";

  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: generateSummarizePrompt(inputText),
      max_tokens: 3000,
      //temperature: 0.7,
      //n:2
    });
    console.log(completion.choices[0].text);
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      // res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

main();
