const fs = require("fs");
const path = require("path");
const logFilePath = path.resolve(__dirname, "../logs.txt");

/**
 * Custom console instance that writes logs to a file (logs.txt).
 * Use this logger for persistent logging throughout the application.
 * @type {console.Console}
 */
const myConsole = new console.Console(fs.createWriteStream(logFilePath));

module.exports = myConsole;
