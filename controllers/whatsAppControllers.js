// Home Controllers
// ****************
const fs = require("fs");
const myConsole = new console.Console(
  fs.createWriteStream("./public/logs.txt")
);

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
    myConsole.log(messageObject);
    res.send("EVENT_RECEIVED");
  } catch (err) {
    console.log(err);
    // Necessary to avoid resending the message
    res.send("EVENT_RECEIVED");
  }
};

module.exports = {
  VerifyToken,
  ReceiveMessage,
  // renderIndex: (req, res) => {
  //   res.render("index.ejs");
  // },
};
