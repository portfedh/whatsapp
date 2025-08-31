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
 * /:
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
 *   post:
 *     summary: Receive WhatsApp message
 *     responses:
 *       200:
 *         description: Message received
 */
router.get("/", verifyTokenController.VerifyToken);
router.post("/", ReceiveMessage);

// Exports
// *******
module.exports = router;
