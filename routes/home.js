// Home Routes
// ===========

// Imports
// *******
const express = require("express");
const router = express.Router();
const homeCtrl = require("../controllers/home");

// Routes
// ******
router.get("/", homeCtrl.renderIndex);

// Exports
// *******
module.exports = router;
