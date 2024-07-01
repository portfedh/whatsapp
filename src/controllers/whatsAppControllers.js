// Home Controllers
// ****************
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");

/* 
VerifyToken():
Function is only called once
- Requires a webhooks to be set up in the Facebook Developer Console
- Requires a public url to send the request
- Requires you paste accessToken there to verify the request
*/
const VerifyToken = (req, res) => {
  try {
    let accessToken = "AngryTurkeys";
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (challenge != null && token != null && token == accessToken) {
      // If correct:
      res.send(`Token verified. Your challenge was: ${challenge}`);
    } else {
      // If incorrect:
      res
        .status(400)
        .send(`Token rejected. token: ${token}, challenge: ${challenge}`);
    }
  } catch (err) {
    // If error:
    console.log(err);
    res.status(400).send(`error: ${err.message}`);
  }
};

/* 
ReceiveMessage():
Function is called every time a message is received
- Requires a webhooks to be set up in the Facebook Developer Console
- Requires you to be subscribed to messages
- EVENT_RECEIVED is a necessary response to confirm message
*/
const ReceiveMessage = (req, res) => {
  try {
    let entry = req.body["entry"][0];
    let changes = entryy["changes"][0];
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
        myConsole.log("Number: ", number); // For Debugging
        processMessage.process(text, normalizedNumber);
      }
    }
    res.send("EVENT_RECEIVED");
  } catch (err) {
    myConsole.log("Error: ", err); // For Debugging
    res.send("EVENT_RECEIVED");
  }
};

function getTextUser(messages) {
  let text;
  let typeMessage = messages["type"];
  if (typeMessage === "text") {
    // Text
    text = messages["text"]["body"];
  } else if (typeMessage === "interactive") {
    // Interactive
    let interactiveObject = messages["interactive"];
    let typeInteractive = interactiveObject["type"];
    if (typeInteractive === "button_reply") {
      // Interactive Button pressed
      text = interactiveObject["button_reply"]["title"];
    } else if (typeInteractive === "list_reply") {
      // Interactive List reply
      text = interactiveObject["list_reply"]["title"];
    } else {
      myConsole.log("Sin mensaje");
    }
  } else {
    myConsole.log("Sin mensaje");
  }
  return text;
}
/**
normalizeNumber():
Remove the leading "1" if it is present after the country code "52" for Mexico.
Otherwise, return the number as is.
 */
function normalizeNumber(number) {
  if (number.startsWith("521")) {
    return "52" + number.slice(3);
  }
  return number;
}

// Function to process the message with our sample texts:
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

module.exports = {
  VerifyToken,
  ReceiveMessage,
  getTextUser,
  normalizeNumber,
};
