// Home Controllers
// ****************
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));

const VerifyToken = (req, res) => {
  try {
    let accessToken = "679e95b74f7b417c97b40413cdf798d9"; // Make Environment Variable
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (challenge != null && token != null && token == accessToken) {
      res.send(challenge);
    } else {
      res.status(400).send({ accessToken, token, challenge });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, accessToken, token, challenge });
  }
};

const ReceiveMessage = (req, res) => {
  try {
    let entry = req.body["entry"][0];
    let changes = entry["changes"][0];
    let value = changes["value"];
    let messageObject = value["messages"];

    if (typeof messageObject != "undefined") {
      let messages = messageObject[0];
      let text = getTextUser(messages);
      console.log("ReceiveMessage/Text: ", text);
      myConsole.log(text);
    }

    res.send("EVENT_RECEIVED");
  } catch (err) {
    console.log(err);
    // Necessary to avoid resending the message
    res.send("EVENT_RECEIVED");
  }
};

function getTextUser(messages) {
  let text = "";
  let typeMessage = messages["type"];

  if (typeMessage === "text") {
    text = messages["text"]["body"];
  } else if (typeMessage === "interactive") {
    let interactiveObject = messages["interactive"];
    let typeInteractive = interactiveObject["type"];
    myConsole.log(interactiveObject);
    console.log("getTextUser/Interactive Object: ", interactiveObject);
    if (typeInteractive === "button_reply") {
      text = interactiveObject["button_reply"]["title"];
    } else if (typeInteractive === "list_reply") {
      text = interactiveObject["list_reply"]["title"];
    } else {
      myConsole.log("Sin mensaje");
      console.log("Sin mensaje");
    }
  } else {
    myConsole.log("Sin mensaje");
    console.log("Sin mensaje");
  }
  return text;
}

module.exports = {
  VerifyToken,
  ReceiveMessage,
  // renderIndex: (req, res) => {
  //   res.render("index.ejs");
  // },
};
