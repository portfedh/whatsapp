// Home Routes
// ===========

// Imports
// *******
const express = require("express");
const router = express.Router();
const ReceiveMessage = require("../controllers/ReceiveMessage");
const verifyTokenController = require("../controllers/verifyTokenController");

// Routes
// ******

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             example:
 *               status: ok
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * @swagger
 * /webhook:
 *   get:
 *     summary: Verify webhook token
 *     parameters:
 *       - in: query
 *         name: hub.verify_token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token to be verified
 *       - in: query
 *         name: hub.challenge
 *         schema:
 *           type: string
 *         required: true
 *         description: The challenge string to echo back if token is valid
 *     responses:
 *       200:
 *         description: Token verified
 *         content:
 *           text/plain:
 *             example: "1234567890"
 *       400:
 *         description: Token rejected or error
 *         content:
 *           text/plain:
 *             examples:
 *               invalid_token:
 *                 summary: Invalid token
 *                 value: "Token rejected. token: wrongtoken, challenge: 1234567890"
 *               error:
 *                 summary: Error
 *                 value: "error: some error message"
 */
router.get("/", verifyTokenController.VerifyToken);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Receive WhatsApp message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             object: "whatsapp_business_account"
 *             entry:
 *               - id: "344026082123296"
 *                 changes:
 *                   - value:
 *                       messaging_product: "whatsapp"
 *                       metadata:
 *                         display_phone_number: "15550191723"
 *                         phone_number_id: "344985858695654"
 *                       contacts:
 *                         - profile:
 *                             name: "Pablo Cruz"
 *                           wa_id: "5215510699160"
 *                       messages:
 *                         - from: "5215510699160"
 *                           id: "wamid.HBgNNTIxNTUxMDY5OTE2MBUCABIYFjNFQjA3M0Q1QUFEQjYzMTJBMjM5RkMA"
 *                           timestamp: "1756614004"
 *                           text:
 *                             body: "This is a test message, sent by the user."
 *                           type: "text"
 *                     field: "messages"
 *     responses:
 *       200:
 *         description: Message received
 */
router.post("/", ReceiveMessage);

// Exports
// *******
module.exports = router;
