// Home Controllers
// ****************

const VerifyToken = (req, res) => {
  res.send("Hello Send Message");
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
