const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config({ path: __dirname + "/../.env" });
console.log("TestToken: ", process.env.OPENAI_API_KEY);

async function getMessageChatGPT(text) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }],
    max_tokens: 100,
  });

  if (response.status == 200 && response.data.choices.length > 0) {
    return response.data.choices[0].message.content;
  } else {
    return null;
  }
}

module.exports = {
  getMessageChatGPT,
};
