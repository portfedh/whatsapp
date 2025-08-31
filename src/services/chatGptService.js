const OpenAI = require("openai");

/**
 * Sends a prompt to OpenAI's ChatGPT and returns the generated response.
 * Uses the GPT-4 model and a system message role.
 * @param {string} text - The prompt or message to send to ChatGPT
 * @returns {Promise<string|null>} The response from ChatGPT, or null if an error occurs
 */
async function getMessageChatGPT(text) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-RvC0L5PTJO7pgs7NTrNGkl4P",
    project: "proj_jeoQk7mO14A1lWr603eJKPnX",
  });

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: text }],
      model: "gpt-4",
      max_tokens: 100,
    });

    // console.log(completion.choices[0]);

    if (completion.choices && completion.choices.length > 0) {
      return completion.choices[0].message.content;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in getMessageChatGPT: ", error);
    return null;
  }
}

module.exports = {
  getMessageChatGPT,
};
