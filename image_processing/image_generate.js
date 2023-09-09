const OpenAI = require("openai");
require("dotenv").config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const image_generate = await openai.images.generate({
    prompt: "Mahatma Gandhi",
    n: 2,
    size: "1024x1024",
  });

  console.log(image_generate.data);
}

main();
