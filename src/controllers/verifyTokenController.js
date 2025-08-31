// Verify Token Controller
// **********************

/**
 * Controller to verify the webhook token for WhatsApp integration.
 * Called once during webhook setup to validate the provided token.
 * Responds with the challenge if the token is valid, otherwise returns an error.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
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
