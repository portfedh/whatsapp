const OpenAI = require("openai");
require("dotenv").config({ path: __dirname + "/../.env" });
console.log("TestToken: ", process.env.OPENAI_API_KEY);

async function getMessageChatGPT(text) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }],
    max_tokens: 100,
  });

  if (response.status == 200 && response.choices.length > 0) {
    return response.choices[0].message.content;
  } else {
    return null;
  }
}

module.exports = {
  getMessageChatGPT,
};
