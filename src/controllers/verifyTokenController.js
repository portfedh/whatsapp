// Verify Token Controller
// **********************

/* 
VerifyToken():
Function is only called once
- Requires a webhooks to be set up in the Facebook Developer Console
- Requires a public url to send the request
- Requires you paste accessToken there to verify the request
*/
const VerifyToken = (req, res) => {
  try {
    let accessToken = process.env.WHATSAPP_VERIFY_TOKEN;
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (challenge != null && token != null && token == accessToken) {
      // If correct:
      res.send(challenge);
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

module.exports = {
  VerifyToken,
};