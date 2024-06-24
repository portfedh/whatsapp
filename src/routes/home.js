// Home Routes
// ===========

// Imports
// *******
const express = require("express");
const router = express.Router();
const whatsAppController = require("../controllers/whatsAppControllers");

// Routes
// ******
router.get("/", whatsAppController.VerifyToken);
router.post("/", whatsAppController.ReceiveMessage);

// Exports
// *******
module.exports = router;
