// Home Routes
// ===========

// Imports
// *******
const express = require("express");
const router = express.Router();
const whatsAppController = require("../controllers/whatsAppControllers");
const verifyTokenController = require("../controllers/verifyTokenController");

// Routes
// ******
router.get("/", verifyTokenController.VerifyToken);
router.post("/", whatsAppController.ReceiveMessage);

// Exports
// *******
module.exports = router;
