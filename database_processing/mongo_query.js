const mongoose = require("mongoose");
const OpenAI = require("openai");
require("dotenv").config({ path: "../.env" });
const { mongoConnect } = require("./mongoConnect");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class ChatBotProcessor {
  constructor(dbUrl) {
    this.dbUrl = dbUrl;
  }

  async processChatInput(chatBotInput) {
    const input = `Generate a mongoose query using db.collection(collectionName) based on this: ${chatBotInput}. 
      If the query has a find, the suffix of the query should have .toArray(). 
      The collection name must be all in lowercase.`;

    try {
      const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 1000,
        temperature: 0,
      });

      console.log(completion.choices[0].text);

      await this.mongoConnect();

      const db = mongoose.connection.db;

      const res = await eval(completion.choices[0].text);

      const secondInput = `Given ${JSON.stringify(
        res
      )}. Extract the data based on: ${chatBotInput}. And return a nice reply.`;

      const completion2 = await openai.completions.create({
        model: "text-davinci-003",
        prompt: secondInput,
        max_tokens: 1000,
        temperature: 0,
      });

      console.log(completion2.choices[0].text);
    } catch (error) {
      // Handle errors here
      console.error(`Error: ${error.message}`);
    }
  }

  async mongoConnect() {
    try {
      await mongoose.connect(this.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("Connected to MongoDB database");
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`);
      throw error;
    }
  }
}

const dbUrl = ""; // Replace with your DB URL
const chatBotInput = "";
const chatBotProcessor = new ChatBotProcessor(dbUrl);
chatBotProcessor.processChatInput(chatBotInput);
