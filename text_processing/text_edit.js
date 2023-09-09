const OpenAI = require("openai");
require("dotenv").config({ path: "../.env" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const edit = await openai.edits.create({
    model: "text-davinci-edit-001",
    input: "Hi, my name is Peter Callahan.I am here to sell you this product",
    instruction: "Make this sentence sound good",
  });

  console.log(edit.choices[0].text);
}

main();
