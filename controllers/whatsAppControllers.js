// Home Controllers
// ****************

const VerifyToken = (req, res) => {
  try {
    let accessToken = "987654321";
    let token = req.query("hub.verify_token");
    let challenge = req.body("hub.challenge");
    if (challenge != null && token != null && token == accessToken) {
      res.send(challenge);
    } else {
      res.status(400).send();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

const ReceiveMessage = (req, res) => {
  res.send("Hello Receive Message");
};

module.exports = {
  VerifyToken,
  ReceiveMessage,
  // renderIndex: (req, res) => {
  //   res.render("index.ejs");
  // },
};
