const OpenAI = require("openai");
require("dotenv").config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const input = "Dalai Lama is a good man.He has done many things such as";

  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 4080,
      //temperature: 1,
      //n:2
    });
    console.log(completion.choices[0].text);
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

main();
