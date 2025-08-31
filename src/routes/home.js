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
 * /:
 *   get:
 *     summary: Verify webhook token
 *     responses:
 *       200:
 *         description: Token verified
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
