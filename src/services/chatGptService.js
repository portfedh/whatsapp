const { max } = require("moment");
const { Configuration, OpenAIApi } = require("openai");

// Load environment variables
require("dotenv").config({ path: __dirname + "/../.env" });
const accessToken = process.env.OPENAI_API_KEY;
console.log("TestToken: ", accessToken);

async function getMessageChatGPT(text) {
  const configuration = new Configuration({ apiKey: accessToken });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    prompt: text,
    max_tokens: 100,
  });

  if (response.status == 200 && response.data.choices.length > 0) {
    return response.data.choices[0].text;
  } else {
    return null;
  }
}

module.exports = {
  getMessageChatGPT,
};
