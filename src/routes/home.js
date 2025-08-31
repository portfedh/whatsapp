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
router.get("/", verifyTokenController.VerifyToken);
router.post("/", ReceiveMessage);

// Exports
// *******
module.exports = router;
