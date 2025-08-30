const fs = require("fs");
const path = require("path");
const logFilePath = path.resolve(__dirname, "../logs.txt");
const myConsole = new console.Console(fs.createWriteStream(logFilePath));
module.exports = myConsole;
