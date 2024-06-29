// Home Controllers
// ****************
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const whatsAppService = require("../services/whatsAppService");
const samples = require("../shared/sampleModels");

/* 
VerifyToken:
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
ReceiveMessage:
Function is called every time a message is received
- Requires a webhooks to be set up in the Facebook Developer Console
- Requires you to be subscribed to messages
- EVENT_RECEIVED is a necessary response to confirm message
*/
const ReceiveMessage = (req, res) => {
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
      myConsole.log("Text: ", text);
      myConsole.log("Number: ", number);
      myConsole.log("Normalized Number: ", normalizedNumber);
      myConsole.log("Full Message: ", messages);

      // Temp: Enviar el mismo mensaje
      if (text === "text") {
        let data = samples.sampleText("Hallo!", normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else if (text === "image") {
        let data = samples.sampleImage(normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else if (text === "audio") {
        let data = samples.sampleAudio(normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else if (text === "video") {
        let data = samples.sampleVideo(normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else if (text === "document") {
        let data = samples.sampleDocument(normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else if (text === "button") {
        let data = samples.sampleButtons(normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else if (text === "list") {
        let data = samples.sampleList(normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else if (text === "location") {
        //error
        let data = samples.sampleLocation(normalizedNumber);
        whatsAppService.sendMessageWhatsApp(data);
      } else {
        let data = samples.sampleText(
          "Tipo de mensaje no identificado!",
          normalizedNumber
        );
        whatsAppService.sendMessageWhatsApp(data);
      }
    }

    res.send("EVENT_RECEIVED");
  } catch (err) {
    myConsole.log("Error: ", err.message); // For Debugging
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

function normalizeNumber(number) {
  if (number.startsWith("521")) {
    return "52" + number.slice(3);
  }
  return number;
}

module.exports = {
  VerifyToken,
  ReceiveMessage,
  getTextUser,
  normalizeNumber,
};
