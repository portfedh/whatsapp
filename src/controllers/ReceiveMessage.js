const myConsole = require("../services/logger");
const processMessage = require("../shared/processMessage");
const getTextUser = require("../utils/getTextUser");
const normalizeNumber = require("../utils/normalizeNumber");

/**
 * Controller to handle incoming WhatsApp webhook messages.
 * Extracts message data, normalizes the sender's number, and processes the message text.
 * Always responds with 'EVENT_RECEIVED' to acknowledge the webhook event.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function ReceiveMessage(req, res) {
  try {
    let entry = req.body["entry"][0];
    let changes = entry["changes"][0];
    let value = changes["value"];
    let messageObject = value["messages"];

    if (typeof messageObject != "undefined") {
      // If there is a message:
      let messages = messageObject[0];
      let number = messages["from"];
      let normalizedNumber = normalizeNumber(number);
      let text = getTextUser(messages);

      if (text != null) {
        // If there is text:
        myConsole.log("Message Received: ", text); // For Debugging
        myConsole.log("From number: ", number); // For Debugging
        // Respond to message:
        await processMessage.process(text, normalizedNumber);
      }
    }
    res.send("EVENT_RECEIVED");
  } catch (err) {
    myConsole.log("Error: ", err); // For Debugging
    res.send("EVENT_RECEIVED");
  }
}

/* 
ReceiveMessage():
Function is called every time a message is received
- Requires a webhooks to be set up in the Facebook Developer Console
- Requires you to be subscribed to messages
- EVENT_RECEIVED is a necessary response to confirm message
*/

// Function to process the message with sample texts:
// **************************************************
// const whatsAppService = require("../services/whatsAppService");
// const samples = require("../shared/sampleModels");
// let data = processMessageTextSample(text, normalizedNumber);
// Log the data being sent
// myConsole.log("Data to send: ", data);
// whatsAppService.sendMessageWhatsApp(data);
// function processMessageTextSample(text, normalizedNumber) {
//   let data;
//   if (text === "text") {
//     data = samples.sampleText("Hallo!", normalizedNumber);
//   } else if (text === "image") {
//     data = samples.sampleImage(normalizedNumber);
//   } else if (text === "audio") {
//     data = samples.sampleAudio(normalizedNumber);
//   } else if (text === "video") {
//     data = samples.sampleVideo(normalizedNumber);
//   } else if (text === "document") {
//     data = samples.sampleDocument(normalizedNumber);
//   } else if (text === "button") {
//     data = samples.sampleButtons(normalizedNumber);
//   } else if (text === "list") {
//     data = samples.sampleList(normalizedNumber);
//   } else if (text === "location") {
//     data = samples.sampleLocation(normalizedNumber); //error to debug
//   } else {
//     data = samples.sampleText("Mensaje no identificado!", normalizedNumber);
//   }
//   return data;
// }

module.exports = ReceiveMessage;
